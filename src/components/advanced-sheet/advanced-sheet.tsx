import { Component, Prop, Event, EventEmitter, Element} from '@stencil/core';
//import * as nglLib from 'ngl/ngl';
@Component({
	tag:'advanced-sheet',
	styleUrl: 'advanced-sheet.css'
})

export class AdvancedSheet{

	@Prop() data :object = {};
	@Prop() pdbFile: string ;
	@Event() sheetLoaded: EventEmitter;
	@Event() dataDisplayed: EventEmitter;
	@Event() buildView: EventEmitter;
	@Element() host: HTMLElement;
	

	componentDidLoad() {
    	this.sheetLoaded.emit()
  	}  	

  	componentDidUpdate(){
  		//console.log(this.pdbFile)
  		let table = this.host.getElementsByClassName('infos')[0]
  		//console.log(table.clientHeight)
  		//console.log(this.pdbFile)
  		this.buildView.emit({"file":this.pdbFile,"tableHeight":table.clientHeight})
  		//console.log(table.clientHeight)
  		//this.pdbFile = 
  		//this.createView(table.clientHeight)
  	}
	/*
  	createView(height){
  		//console.log(this.pdbFile)
  		let self = this;
  		let elem = this.host.getElementsByClassName("nglView")[0];
  		while (elem.firstChild) {
  		  	let canvas = this.host.getElementsByTagName('canvas')[0];
  		  	console.dir(canvas)
			let gl = canvas.getContext('webgl');
			gl.getExtension('WEBGL_lose_context').loseContext();
			//gl = undefined;		
    		elem.removeChild(elem.firstChild);
    		console.log(gl.isContextLost())
		}
		elem["style"]="height:"+height+"px;";
  		let stage = new window["NGL"].Stage( elem, { backgroundColor: "lightgrey"} );
  		console.log(stage)
  		
    //   .getExtension('WEBGL_lose_context').loseContext(); 			
  		stage.loadFile(self.pdbFile).then(function(component){
  			stage.handleResize()
  			//console.log(stage.viewer.renderer)
  			component.addRepresentation("ball+stick");
  			component.autoView();
  		})

  	}
	*/

	render(){

		let row = []
		if (Object.keys(this.data).length >0){ 			// Because the data are loaded after the component is loaded for the first time 

			let properties = this.data["data"][0]
			let keys = Object.keys(properties)
			row = keys.map((e) => {
					return <tr><td>{e}</td><td>{properties[e]}</td></tr>
			})
			//let table = this.host.getElementsByClassName('infos')[0]
			//console.log(table.clientHeight)
			this.dataDisplayed.emit({"id":properties["_id"],"data":properties,"pdbFile":this.pdbFile})

  		}
		

		return(
			<div class= "sheet-content " >
				<table class="infos ">{row}</table>
				
				
			</div>
		);
		//this.load(this.data)
	}
}