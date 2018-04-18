import { 
		Component, 
		Prop, 
		Element, 
		Listen, 
		State, 
		} from '@stencil/core';

@Component({
	tag:'advanced-sheet-handler',
	styleUrl: 'advanced-sheet-handler.css'
})

export class AdvancedSheetHandler{

	@Prop() pdbFile: string;
	@State() catalog = {};
	@Prop() max_window = 3;
	@Element() host: HTMLElement;
	visible_start = 0;
	@Prop() nglview: boolean;


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
				sheet.pdbFile = self.catalog[update.text]["pdbFile"];
				event.target["parentNode"]["classList"].add('active')

			})
			li.appendChild(update)
			to_update.appendChild(li)
			this.catalog[data.detail.id]= data.detail.data;
			this.catalog[data.detail.id]["pdbFile"]=data.detail.pdbFile			
			this.catalog = {...this.catalog};
		}
		else{
			let sheet = document.getElementsByTagName('advanced-sheet')[0]
			sheet.data = {'data':[self.catalog[data.detail.text]]}
		}
		//this.createView(data.detail.pdbFile)
	}

	@Listen('buildView')
	createView(data){
  		if(this.nglview){
  			let elem = this.host.getElementsByClassName("nglView")[0];
  			console.log(data.detail.tableWidth)
  			elem["style"]="height:"+data.detail.tableHeight+"px;width: "+data.detail.tableWidth+"px;";
			let nglView = elem.getElementsByTagName("canvas");
			if(nglView.length === 0){
  				window["stage"] = new window["NGL"].Stage( elem, { backgroundColor: "lightgrey"} );		
  				window["stage"].loadFile(data.detail.file).then(function(component){
  					window["stage"].handleResize()
  					component.addRepresentation("ball+stick");
  					component.autoView();
  				})
  			}
  			else{
  				window["stage"].removeAllComponents()
  				window["stage"].loadFile(data.detail.file).then(function(component){
  					window["stage"].handleResize()
  					component.addRepresentation("ball+stick");
  					component.autoView();
  				})
				
  			}
  		}

  	}



	render(){

		return(
			<div class="sheetHandler container">
				<ul class="nav nav-tabs allDetHeader" >
					<i class="paginate nav-link fa fa-angle-double-left allDetheader-left-arrow"></i>
					<i class="paginate nav-link fa fa-angle-double-right allDetheader-right-arrow"></i>
				</ul>
				<div class="row">
		    		<div class="tab-content allDetBody col-xs-6 " id="DetContent"><advanced-sheet></advanced-sheet></div>
   					<div class="nglView col-xs-6"></div>
   				</div>
    		</div>
		);
	}
}