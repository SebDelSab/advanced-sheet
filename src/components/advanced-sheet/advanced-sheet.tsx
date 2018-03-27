import { Component, Prop, Element } from '@stencil/core';

@Component({
	tag:'advanced-sheet',
	styleUrl: 'advanced-sheet.css'
})

export class AdvancedSheet{

	@Prop() data :object = {};
	@Element() host: HTMLElement;

	render(){
		//this.load(this.data)
		let properties = this.data["data"][0]
		let row = []
		let keys = Object.keys(properties)
		row = keys.map((e) => {
			return <tr><td>{e}</td><td>{properties[e]}</td></tr>
			}
		)

		return(
		<table class="infos">{row}</table>
		);
	}
}