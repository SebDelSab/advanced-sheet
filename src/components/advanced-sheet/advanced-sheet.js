var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Prop, Event, Element } from '@stencil/core';
//import * as nglLib from 'ngl/ngl';
let AdvancedSheet = class AdvancedSheet {
    //import * as nglLib from 'ngl/ngl';
    constructor() {
        this.data = {};
    }
    componentDidLoad() {
        this.sheetLoaded.emit();
    }
    componentDidUpdate() {
        //console.log(this.pdbFile)
        let table = this.host.getElementsByClassName('infos')[0];
        //console.dir(table)
        //console.log(table.clientHeight)
        //console.log(this.pdbFile)
        this.buildView.emit({ "file": this.pdbFile, "tableHeight": table.clientHeight, "tableWidth": table.clientWidth });
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
    render() {
        let row = [];
        if (Object.keys(this.data).length > 0) { // Because the data are loaded after the component is loaded for the first time 
            let properties = this.data["data"][0];
            let keys = Object.keys(properties);
            row = keys.map((e) => {
                if (e != "pdbFile")
                    return h("tr", null,
                        h("td", null, e),
                        h("td", null, properties[e]));
            });
            this.dataDisplayed.emit({ "id": properties["_id"], "data": properties, "pdbFile": this.pdbFile });
        }
        return (h("div", { class: "sheet-content" },
            h("table", { class: "infos " }, row)));
        //this.load(this.data)
    }
};
__decorate([
    Prop()
], AdvancedSheet.prototype, "data", void 0);
__decorate([
    Prop()
], AdvancedSheet.prototype, "pdbFile", void 0);
__decorate([
    Event()
], AdvancedSheet.prototype, "sheetLoaded", void 0);
__decorate([
    Event()
], AdvancedSheet.prototype, "dataDisplayed", void 0);
__decorate([
    Event()
], AdvancedSheet.prototype, "buildView", void 0);
__decorate([
    Element()
], AdvancedSheet.prototype, "host", void 0);
AdvancedSheet = __decorate([
    Component({
        tag: 'advanced-sheet',
        styleUrl: 'advanced-sheet.css'
    })
], AdvancedSheet);
export { AdvancedSheet };
