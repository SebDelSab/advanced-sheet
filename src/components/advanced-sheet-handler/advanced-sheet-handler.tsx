import { 
		Component, 
		Prop, 
		Element, 
		Listen, 
		State, 
		//Watch 
		} from '@stencil/core';

@Component({
	tag:'advanced-sheet-handler',
	styleUrl: 'advanced-sheet-handler.css'
})

export class AdvancedSheetHandler{

	@State() catalog = {};
	@Prop() max_window = 3;
	@Element() host: HTMLElement;
	visible_start = 0;


	@Listen('dataDisplayed')
	updateHandler(data){
		let self = this;
		let actives = this.host.getElementsByClassName('active');
		let to_update = this.host.getElementsByClassName('allDetHeader')[0];
		if(!this.catalog.hasOwnProperty(data.detail.id)){
			for (let i=0; i< actives.length; i++){
				actives[i].classList.remove('active')
			}
			let li = document.createElement('li');
			let update = document.createElement('a');
			update["data-toggle"]="tab"
			li.className = "active "
			update.text = data.detail.id
			update.addEventListener('click',function(event){
				for (let i=0; i< actives.length; i++){
					actives[i].classList.remove('active')
				}
				let sheet = document.getElementsByTagName('advanced-sheet')[0]
				sheet.data = {'data':[self.catalog[update.text]]}
				event.target["parentNode"]["classList"].add('active')
			})
			li.appendChild(update)
			to_update.appendChild(li)
			this.catalog[data.detail.id]= data.detail.data;			
			this.catalog = {...this.catalog};
		}
		else{
			let sheet = document.getElementsByTagName('advanced-sheet')[0]
			sheet.data = {'data':[self.catalog[data.detail.text]]}
		}
	}

	/*
	@Watch('catalog')
	displayArrows(){
		if(Object.keys(this.catalog).length > this.max_window){
			let left_arrow = this.host.getElementsByClassName('allDetheader-left-arrow')[0]
			left_arrow["style"].display = "block";
		}
	}
	*/


	render(){

		return(
			<div class="sheetHandler">
			<nav>
				<ul class="nav nav-tabs allDetHeader" >
					<i class="paginate nav-link fa fa-angle-double-left allDetheader-left-arrow"></i>
					<i class="paginate nav-link fa fa-angle-double-right allDetheader-right-arrow"></i>
				</ul>
			</nav>
    		<div class="tab-content allDetBody" id="DetContent"><advanced-sheet></advanced-sheet></div>
    		</div>
		);
	}
}