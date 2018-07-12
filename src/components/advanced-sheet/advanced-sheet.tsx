import { Component, Prop, Event, EventEmitter, Element} from '@stencil/core';
//import * as nglLib from 'ngl/ngl';
@Component({
	tag:'advanced-sheet',
	styleUrl: 'advanced-sheet.css'
})

export class AdvancedSheet{
	@Prop() max_char;
	@Prop() data :object = {};
	@Prop() pdbFile: string ;
	@Event() sheetLoaded: EventEmitter;
	@Event() dataDisplayed: EventEmitter;
	@Event() buildView: EventEmitter;
	@Element() host: HTMLElement;
	@Event() shortenReady: EventEmitter; 
	@Event() resetTooltipable: EventEmitter;

	componentDidLoad() {
    	this.sheetLoaded.emit()
    	
  	}  	

  	// componentWillUpdate(){
  	// 	let tooltipable = this.host.getElementsByClassName('tooltipable');
  	// 	for(let i = 0; i<tooltipable.length; i++){
  	// 		tooltipable[i].classList.remove("tooltipable")
  	// 	}
  	// }

  	componentWillUpdate(){
  		let tooltipable = this.host.getElementsByClassName('tooltipable');
  		for(let i = 0; i<tooltipable.length; i++){
  	 		tooltipable[i].removeEventListener("mouseover",this.mouseOver);
			tooltipable[i].removeEventListener("mouseout",this.mouseOut);
			//tooltipable[i].classList.remove("tooltipable")  	 		
  	 	}
  		console.log("reseting")
  		//let to_reset = this.host.getElementsByClassName("tooltipable")
  		//this.resetTooltipable.emit({"to_reset":to_reset,"id":this.data["data"][0]._id})
  	}

  	componentDidUpdate(){
  		console.log("update done")
  		let table = this.host.getElementsByClassName('infos')[0]
  		this.buildView.emit({"file":this.pdbFile,"tableHeight":table.clientHeight,"tableWidth":table.clientWidth})
  		let tooltipable = this.host.getElementsByClassName("tooltipable");
		for(let i = 0; i<tooltipable.length; i++){
				//let text = tooltipable[i].innerHTML;
				//tooltipable[i]["content"] = text;
				//sheettd[i].innerHTML = sheettd[i].innerHTML.substr(0,this.max_char) + "...";
				tooltipable[i].addEventListener("mouseover", this.mouseOver);
    			tooltipable[i].addEventListener("mouseout", this.mouseOut);
    			//console.log(sheettd)
    			//let text = sheettd[i].innerHTML;
    			//sheettd[i].innerHTML = text.substring(0,this.max_char)
    			//sheettd[i].innerHTML = sheettd[i].innerHTML.substr(0,this.max_char) + "...";
    			
			}
			//this.shortenReady.emit(this.data["data"][0]._id)
		} 

 		
  	//}

	mouseOver = function(event) {
    	this.style.color = "blue";
    	//console.log(this.content)
    	let tooltip = document.getElementsByClassName('shortentooltip')
    	let tooltiptext = document.getElementsByClassName('shortentooltiptext')
    	//console.log(tooltip)
    	//console.dir(this)
    	tooltip[0]["style"]["visibility"] = "visible"
    	tooltiptext[0].textContent = this.getAttribute("content");
    	tooltip[0]["style"]["left"] = event.x + "px"
    	tooltip[0]["style"]["top"] = event.y + "px"
    	//console.log(event)
	}
	mouseOut = function () {
    	this.style.color = "black";
    	let tooltip = document.getElementsByClassName('shortentooltip')
    	tooltip[0]["style"]["visibility"] = "hidden";
	}

	truncateAndTooltipText = function(text){
		let props = {}
		//let value = document.createElement("td");
		let string = String(text);
		if (string.length >this.max_char){
			//value.classList.add("tooltipable")
			props["content"] = string 
			//value.textContent = string.substr(0,this.max_char)+"..."
			return <td class = "tooltipable" {...props}>{string.substr(0,this.max_char)+"..."}</td>
		}
		else{
			return <td >{string}</td>
		}
	}



	render(){
		console.log("rendering")
		let row = []
		if (Object.keys(this.data).length >0){ 			// Because the data are loaded after the component is loaded for the first time 

			let properties = this.data["data"][0]
			let keys = Object.keys(properties)
			row = keys.map((e) => {
				if(e!="pdbFile"){
					if(properties[e]){
						if(properties[e].length){
							return <tr><td >{e}</td>{this.truncateAndTooltipText(properties[e])}</tr>

							/*if(properties[e].length>this.max_char){
								//this.truncateText(properties[e])
								return <tr><td >{e}</td><td class="sheettd tooltipable">{this.truncateText(properties[e])}</td></tr>
							}
							else{
								return <tr><td >{e}</td><td class="sheettd">{properties[e]}</td></tr>
							}*/
						}
						else{
							return <tr><td>{e}</td><td class="sheettd">{properties[e]}</td></tr>
						}
					}
				}
			})
			this.dataDisplayed.emit({"id":properties["_id"],"data":properties,"pdbFile":this.pdbFile})

  		}
		return(
			<div class= "sheet-content" >
				<table class="infos ">{row}</table>		
			</div>

		);
		//this.load(this.data)
	}
}