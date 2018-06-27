import { 
		Component, 
		Prop, 
		Element, 
		Listen, 
		State, 
		} from '@stencil/core';

import * as nglLib from 'ngl';

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
			/*li.className = "nav-item";*/

			/*
			 *
			 * Here the code to generate the cross allowing to remove detergent
			 *
			 */

			let removeElem = document.createElement('span');
			let cross = document.createElement('i');
			cross.className ="fa fa-times fa-lg fa-pull-right";
			removeElem.appendChild(cross);
			removeElem.addEventListener('click',function(event){
				event.stopPropagation()

				let active = self.host.getElementsByClassName('active')[0];
				let to_delete = event.target["parentNode"]["parentNode"]["parentNode"];
				let right_arrow = self.host.getElementsByClassName("fa-angle-double-right")[0];
				let nextDet = to_delete.nextSibling;
				if(to_delete===active){
					if(nextDet === right_arrow){
						if(to_delete.previousSibling !==self.host.getElementsByClassName("fa-angle-double-left")[0]){
							to_delete.previousSibling.children[0].click()		// a click call render function ()
						}
						else{
							self.host.remove()
						}
					}
					else{
						to_delete.nextSibling.children[0].click()
					}
				}
 				to_delete.remove()															// we remove the li corresponding to the element we want to remove
				delete self.catalog[event.target["parentNode"]["parentNode"].text]			// we also delete it in the catalog.
			})





			update["data-toggle"]="tab";
			li.className = "active ";
			update.text = data.detail.id;
			update.addEventListener('click',function(event){
				let blocker = self.host.getElementsByClassName('blocker')[0];
				blocker["style"].display = "none";

				for (let i=0; i< actives.length; i++){
					actives[i].classList.remove('active')
				}
				let sheet = document.getElementsByTagName('advanced-sheet')[0]
				sheet.data = {'data':[self.catalog[update.text]]}
				sheet.pdbFile = self.catalog[update.text]["pdbFile"];
				event.target["parentNode"]["classList"].add('active')

			})
			update.appendChild(removeElem);
			li.appendChild(update)
			to_update.appendChild(li)
			let rightArrows = this.host.getElementsByClassName('allDetheader-right-arrow');
			for (let i=0; i< rightArrows.length; i++){
				rightArrows[i].remove()
			}
			let rightArrow = document.createElement('i');
			rightArrow.className = "paginate nav-link fa fa-angle-double-right allDetheader-right-arrow"
			to_update.appendChild(rightArrow)

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

	// Function that build the nglview 
	@Listen('buildView')
	createView(data){
		let self = this;
  		if(this.nglview){																								// if we chose to represent the view
  			let elem = this.host.getElementsByClassName("nglView")[0];
  			let blocker = self.host.getElementsByClassName('blocker')[0];
  			//let nglView = self.host.getElementsByClassName('nglView')[0];
  			//let dlpdb = self.host.getElementsByClassName('downloadPdb')[0];
  			
  			//dlLink.textContent = "test" 
  			//console.log(data.detail.tableWidth)
  			//elem["style"]="height:"+data.detail.tableHeight+"px;width: "+data.detail.tableWidth+"px;";
  			//dlpdb["style"]="height:"+(20*(data.detail.tableHeight))/100+"px;width:200px;"
			let canvas = elem.getElementsByTagName("canvas");
			if(canvas.length === 0)																					// if we don't have a view yet
  				window["stage"] = new nglLib.Stage( elem, { backgroundColor: "lightgrey"} );						// we create it	


  			elem["style"]="height:"+(80*(data.detail.tableHeight))/100+"px;width:"+data.detail.tableWidth+"px;"
  			window["stage"].removeAllComponents();
  			window["stage"].loadFile(data.detail.file)
  			.then(function(component){
  				//elem["style"].display="none";
  				//let dlLink = document.createElement("a");
  				blocker["style"].display = "none";
  				//dlLink.textContent = "test";
  				//dlpdb.appendChild(dlLink);
  				window["stage"].handleResize();  				
  				component.addRepresentation("ball+stick");
  				component.autoView();
  				//elem["style"].display="inline";
  			})
  			.catch(function(error){
  				console.log(error)
  				elem["style"].display="none";
  				//blocker["style"].display = "inline";
  				blocker["style"] = "display:inline-block;height:"+(80*(data.detail.tableHeight))/100+"px;width:"+data.detail.tableWidth+"px;"
  				blocker.children[0]["textContent"]="Warning ! : "+ data.detail.file + " doesn't exists"
  			});
		}
  	}

	render(){

		return(
			<table>
			<div class="sheetHandler container">
				<ul class="nav nav-tabs allDetHeader" >
					<i class="paginate nav-link fa fa-angle-double-left allDetheader-left-arrow"></i>
				</ul>
				<div class="row">
		    		<div class="tab-content allDetBody " id="DetContent">
		    			<advanced-sheet></advanced-sheet>
		    			<tr>
		    				<div class="viewer">

		   						<div class="nglView " ><div class="downloadPdb"></div><div class="detView"></div></div>
   								<div class="blocker "><i class="fa fa-exclamation-triangle"></i></div>
   							</div>
   						</tr>
   					</div>
   				</div>
    		</div>
    		</table>
		);
	}
}