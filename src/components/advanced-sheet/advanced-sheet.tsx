import { Component, Prop, Element, Event, EventEmitter} from '@stencil/core';
//import * as nglLib from 'ngl/ngl';
@Component({
	tag:'advanced-sheet',
	styleUrl: 'advanced-sheet.css'
})

export class AdvancedSheet{

	@Prop() data :object = {};
	@Prop() pdbFile: string ;
	@Element() host: HTMLElement;
	@Event() sheetLoaded: EventEmitter;
	@Event() dataDisplayed: EventEmitter;

	componentDidLoad() {
    	this.sheetLoaded.emit()
  	}  	

  	componentDidUpdate(){
  		//console.log(this.pdbFile)
  		let table = this.host.getElementsByClassName('infos')[0]
  		//console.log(table.clientHeight)
  		//this.pdbFile = 
  		this.createView(table.clientHeight)
  	}
	
  	createView(height){
  		//console.log(this.pdbFile)
  		let self = this;
  		let elem = this.host.getElementsByClassName("nglView")[0];
  		while (elem.firstChild) {
    		elem.removeChild(elem.firstChild);
		}
		elem["style"]="height:"+height+"px;";
  		let stage = new window["NGL"].Stage( elem, { backgroundColor: "lightgrey"} );  			
  		stage.loadFile(self.pdbFile).then(function(component){
  			stage.handleResize()
  			component.addRepresentation("ball+stick");
  			component.autoView();
  		})
  	}

	render(){

		let row = []
		if (Object.keys(this.data).length >0){ 					// Because the data are loaded after the component is loaded for the first time 

			let properties = this.data["data"][0]
			let keys = Object.keys(properties)
			row = keys.map((e) => {
				return <tr><td>{e}</td><td>{properties[e]}</td></tr>
			})

			this.dataDisplayed.emit({"id":properties["_id"],"data":properties,"pdbFile":this.pdbFile})

  		}
		

		return(
			<div class= "sheet-content " >
				<table class="infos col-md-6">{row}</table>
				<div class="nglView col-md-6"></div>
				
			</div>
		);
		//this.load(this.data)
	}
}