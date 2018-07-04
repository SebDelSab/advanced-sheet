var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Prop, Element, Listen, State, } from '@stencil/core';
import * as nglLib from 'ngl';
let AdvancedSheetHandler = class AdvancedSheetHandler {
    constructor() {
        this.catalog = {};
        this.max_window = 3;
        this.visible_start = 0;
        this.deleteOrClickNav = false; // boolean to know if a sheet has been added
        this.leftArrowHandler = function (test) {
            console.log(test);
            //event.stopPropagation()
            console.log("toto");
            // liLeftArrow.addEventListener("click",function(){
            // 	console.log("toto")
            // 	let active = self.host.getElementsByClassName('active')[0];
            // 	console.log(shown[shown.length -1])
            // 	console.log(active.firstChild)
            // 	console.log(shown)
            // 	if(active.firstChild === shown[shown.length -1]){
            // 		console.log("inside if")
            // 		shown[shown.length-2].click()
            // 		self.deleteOrClickNav = true;
            // 	}
            // 	self.visible_start = self.visible_start-1;
            // 	console.log(self.visible_start)
            // 	liRightArrow["style"].display="inline";
            // 	//liLeftArrow["disabled"]= false;
            // })
            console.log(this);
            this.visible_start = this.visible_start - 1;
        };
    }
    updateHandler(data) {
        let self = this;
        let actives = this.host.getElementsByClassName('active');
        let to_update = this.host.getElementsByClassName('allDetHeader')[0];
        if (!this.catalog.hasOwnProperty(data.detail.id)) {
            for (let i = 0; i < actives.length; i++) {
                actives[i].classList.remove('active');
            }
            let li = document.createElement('li');
            let update = document.createElement('a');
            /********************************************************************
             * Here the code to generate the cross allowing to remove detergent *
             ********************************************************************/
            let removeElem = document.createElement('span');
            let cross = document.createElement('i');
            cross.className = "fa fa-times fa-lg fa-pull-right";
            removeElem.appendChild(cross);
            removeElem.addEventListener('click', function (event) {
                event.stopPropagation();
                self.deleteOrClickNav = true;
                let navItems = self.host.getElementsByClassName('nav-item');
                let active = self.host.getElementsByClassName('active')[0];
                let to_delete = event.target["parentNode"]["parentNode"]["parentNode"];
                let right_arrow = self.host.getElementsByClassName("li-right-arrow")[0];
                let left_arrow = self.host.getElementsByClassName("li-left-arrow")[0];
                let nextDet = to_delete.nextSibling;
                if (to_delete === active) {
                    if (nextDet === right_arrow) {
                        if (to_delete.previousSibling !== self.host.getElementsByClassName("li-left-arrow")[0]) {
                            to_delete.previousSibling.children[0].click(); // a click call render function ()
                        }
                        else {
                            self.host.remove();
                        }
                    }
                    else {
                        //console.log(to_delete.nextSibling.children[0])
                        to_delete.nextSibling.children[0].click();
                    }
                }
                if (navItems[self.visible_start].parentNode.previousSibling !== left_arrow) {
                    self.visible_start = self.visible_start - 1;
                    console.log(self.visible_start);
                    navItems[self.visible_start]["style"].display = "block";
                }
                to_delete.remove(); // we remove the li corresponding to the element we want to remove
                delete self.catalog[event.target["parentNode"]["parentNode"].text]; // we also delete it in the catalog.
            });
            update["data-toggle"] = "tab";
            li.className = "active ";
            update.text = data.detail.id;
            update.addEventListener('click', function (event) {
                let blocker = self.host.getElementsByClassName('blocker')[0];
                blocker["style"].display = "none";
                for (let i = 0; i < actives.length; i++) {
                    actives[i].classList.remove('active');
                }
                let sheet = document.getElementsByTagName('advanced-sheet')[0];
                sheet.data = { 'data': [self.catalog[update.text]] };
                sheet.pdbFile = self.catalog[update.text]["pdbFile"];
                event.target["parentNode"]["classList"].add('active');
                self.deleteOrClickNav = true;
            });
            update.appendChild(removeElem);
            update.classList.add("nav-item");
            update.id = data.detail.id + "-link";
            li.appendChild(update);
            to_update.appendChild(li);
            let rightArrows = this.host.getElementsByClassName('li-right-arrow');
            for (let i = 0; i < rightArrows.length; i++) { // Here we destroy all the right-arrows
                rightArrows[i].remove();
            }
            let liRightArrow = document.createElement('li'); // Creation of a right arrow
            liRightArrow.classList.add('li-right-arrow');
            let linkRightArrow = document.createElement('a');
            let rightArrow = document.createElement('i');
            rightArrow.className = "paginate nav-link fa fa-angle-double-right allDetheader-right-arrow";
            linkRightArrow.appendChild(rightArrow);
            liRightArrow.appendChild(linkRightArrow);
            to_update.appendChild(liRightArrow);
            this.catalog[data.detail.id] = data.detail.data;
            this.catalog[data.detail.id]["pdbFile"] = data.detail.pdbFile;
            this.catalog = Object.assign({}, this.catalog);
        }
        else if (this.catalog.hasOwnProperty(data.detail.id)) {
            let navItem = document.getElementById(data.detail.id + "-link");
            navItem.click();
        }
        else {
            let sheet = document.getElementsByTagName('advanced-sheet')[0];
            sheet.data = { 'data': [self.catalog[data.detail.text]] };
        }
        //this.createView(data.detail.pdbFile)
        if (Object.keys(this.catalog).length > this.max_window && this.deleteOrClickNav === false) {
            this.visible_start = this.visible_start + 1;
        }
        else if (Object.keys(this.catalog).length <= this.max_window) {
            this.visible_start = 0;
        }
        let navItems = this.host.getElementsByClassName('nav-item');
        for (let i = 0; i < navItems.length; i++) {
            if (i < this.visible_start || i > this.visible_start + this.max_window) {
                navItems[i]["style"].display = "none";
            }
            else {
                navItems[i]["style"].display = "block";
            }
        }
        /*******************************
        *******  Arrows handler  *******
        *******************************/
        //let navItems =this.host.getElementsByClassName('nav-item'); // Must be redeclared if in function
        let liRightArrow = this.host.getElementsByClassName('li-right-arrow')[0];
        let liLeftArrow = this.host.getElementsByClassName('li-left-arrow')[0];
        if (Object.keys(this.catalog).length > this.max_window && this.visible_start > 0) {
            liLeftArrow["style"].display = "inline";
        }
        else {
            liLeftArrow["style"].display = "none";
        }
        if (this.visible_start === 0) {
            liLeftArrow["style"].display = "none";
        }
        let shown = [];
        for (let i = 0; i < navItems.length; i++) {
            if (navItems[i]["style"].display === "block") {
                shown.push(navItems[i]);
            }
        }
        if (shown[shown.length - 1] === navItems[navItems.length - 1]) {
            liRightArrow["style"].display = "none";
        }
        liLeftArrow.addEventListener("click", self.leftArrowHandler);
        /******************************/
        self.deleteOrClickNav = false;
    }
    // Function that build the nglview 
    createView(data) {
        let self = this;
        if (this.nglview) { // if we chose to represent the view
            let elem = this.host.getElementsByClassName("nglView")[0];
            let blocker = self.host.getElementsByClassName('blocker')[0];
            //let nglView = self.host.getElementsByClassName('nglView')[0];
            //let dlpdb = self.host.getElementsByClassName('downloadPdb')[0];
            //dlLink.textContent = "test" 
            //console.log(data.detail.tableWidth)
            //elem["style"]="height:"+data.detail.tableHeight+"px;width: "+data.detail.tableWidth+"px;";
            //dlpdb["style"]="height:"+(20*(data.detail.tableHeight))/100+"px;width:200px;"
            let canvas = elem.getElementsByTagName("canvas");
            if (canvas.length === 0) // if we don't have a view yet
                window["stage"] = new nglLib.Stage(elem, { backgroundColor: "lightgrey" }); // we create it	
            elem["style"] = "height:" + (80 * (data.detail.tableHeight)) / 100 + "px;width:" + data.detail.tableWidth + "px;";
            window["stage"].removeAllComponents();
            window["stage"].loadFile(data.detail.file)
                .then(function (component) {
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
                .catch(function (error) {
                console.log(error);
                elem["style"].display = "none";
                //blocker["style"].display = "inline";
                blocker["style"] = "display:inline-block;height:" + (80 * (data.detail.tableHeight)) / 100 + "px;width:" + data.detail.tableWidth + "px;";
                blocker.children[0]["textContent"] = "Warning ! : " + data.detail.file + " doesn't exists";
            });
        }
    }
    componentDidLoad() {
        let liLeftArrow = this.host.getElementsByClassName('li-left-arrow')[0];
        liLeftArrow.removeEventListener("click", this.leftArrowHandler);
    }
    render() {
        console.log("rerendering");
        return (h("table", null,
            h("div", { class: "sheetHandler container" },
                h("ul", { class: "nav nav-tabs allDetHeader" },
                    h("li", { class: "li-left-arrow" },
                        h("a", null,
                            h("i", { class: "paginate nav-link fa fa-angle-double-left allDetheader-left-arrow" })))),
                h("div", { class: "row" },
                    h("div", { class: "tab-content allDetBody ", id: "DetContent" },
                        h("advanced-sheet", null),
                        h("tr", null,
                            h("div", { class: "viewer" },
                                h("div", { class: "nglView " },
                                    h("div", { class: "downloadPdb" }),
                                    h("div", { class: "detView" })),
                                h("div", { class: "blocker " },
                                    h("i", { class: "fa fa-exclamation-triangle" })))))))));
    }
};
__decorate([
    Prop()
], AdvancedSheetHandler.prototype, "pdbFile", void 0);
__decorate([
    State()
], AdvancedSheetHandler.prototype, "catalog", void 0);
__decorate([
    Prop()
], AdvancedSheetHandler.prototype, "max_window", void 0);
__decorate([
    Element()
], AdvancedSheetHandler.prototype, "host", void 0);
__decorate([
    State()
], AdvancedSheetHandler.prototype, "visible_start", void 0);
__decorate([
    Prop()
], AdvancedSheetHandler.prototype, "nglview", void 0);
__decorate([
    State()
], AdvancedSheetHandler.prototype, "deleteOrClickNav", void 0);
__decorate([
    Listen('dataDisplayed')
], AdvancedSheetHandler.prototype, "updateHandler", null);
__decorate([
    Listen('buildView')
], AdvancedSheetHandler.prototype, "createView", null);
AdvancedSheetHandler = __decorate([
    Component({
        tag: 'advanced-sheet-handler',
        styleUrl: 'advanced-sheet-handler.css'
    })
], AdvancedSheetHandler);
export { AdvancedSheetHandler };
