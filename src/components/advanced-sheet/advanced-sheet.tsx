import { Component, Prop, Element, Event, EventEmitter } from '@stencil/core';

@Component({
	tag:'advanced-sheet',
	styleUrl: 'advanced-sheet.css'
})

export class AdvancedSheet{

	@Prop() data :object = {};
	@Element() host: HTMLElement;
	@Event() sheetLoaded: EventEmitter;
	@Event() dataDisplayed: EventEmitter;


	componentDidLoad() {
    	this.sheetLoaded.emit()
  	}




	render(){
		let row = []

		if (Object.keys(this.data).length >0){ 					// Because the data are loaded after the component is loaded for the first time 
			let properties = this.data["data"][0]
			let keys = Object.keys(properties)
			row = keys.map((e) => {
				return <tr><td>{e}</td><td>{properties[e]}</td></tr>
			}
			)
			this.dataDisplayed.emit({"id":properties["_id"],"data":properties})
		}
		

		return(
			<div class= "sheet-content">
				<table class="infos">{row}</table>
				<div class="nglView"></div> 
			</div>
		);
		//this.load(this.data)

	}
}