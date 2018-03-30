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
			let update = document.createElement('a');
			update.className = "nav-item nav-link active "
			update.text = data.detail.id
			update.addEventListener('click',function(event){
				for (let i=0; i< actives.length; i++){
					actives[i].classList.remove('active')
				}
				let sheet = document.getElementsByTagName('advanced-sheet')[0]
				sheet.data = {'data':[self.catalog[update.text]]}
				event.target["classList"].add('active');
			})
			to_update.appendChild(update)
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
				<div class="nav nav-tabs allDetHeader" role="tablist" id="DetNavBar">
					<i class="paginate nav-link fa fa-angle-double-left allDetheader-left-arrow"></i>
					<i class="paginate nav-link fa fa-angle-double-right allDetheader-right-arrow"></i>
				</div>
			</nav>
    		<div class="tab-content allDetBody" id="DetContent"><advanced-sheet></advanced-sheet></div>
    		</div>
		);
	}
}