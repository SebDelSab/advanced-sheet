# Advanced-sheet-handler

Advanced-sheet is a web-component that was developped using Stencil (v0.6.1), a web-component compiler developped by the ionic team. 
You can find a link to know how to do some [here](https://stenciljs.com/)

## Getting Started

To install this web-component just run

```bash

npm install advanced-sheet-handler

```

## Example of use

In your HTML file, place the script reference inside your header in order to be able to use this package. NB: The font-awesome link is currently necessary if you want to see the spinner during your search.


```html

<head>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" crossorigin="anonymous">
  <script src='modules/advanced-sheet-handler/dist/advanced-sheet-handler.js'></script>
</head>

```  

Then you can paste this anywhere in your code where a HTML element can be placed:

```html

<advanced-sheet-handler nglview max_window = 3 max_char=30></advanced-sheet-handler>

```

## Accessible events and properties

Some properties and methods are provided. More will probably be added in the future


### Properties 

#### .data

The data property is the main entry point to the component. The component include another component named "advanced-sheet" that has this data property. Your data must be provided in this particular format:

```javascript

{"data":[{"_id":"something","key2": "example", "key3": "example2"}]}

```

"data" and "\_id" are mandatory parameters
The data format will be improved in a next release

#### .pdbFile

By modifying the advanced-sheet pdbFile property you can see your molecule thanks to ngl. This property must be a string (representing the url to your pdb file)

#### nglview

When adding this property inside the html element, allow the component to make a ngl representation of the .pdbFile that was passed to the component 

#### max_window

With this property you can define the number of tab you want to see at the same time. If the number of tab is larger than the total number of tab, arrows will appear allowing to navigate inside the tab that are shown and the tab that are hidden. By defalut, this property equals 3.

#### max_char

This property allows to choose a maximum number of characters inside a row of the data's table. If this value is exceeded, the row will be shortened with the max_char first characters and "..." after them. If you then hover your mouse on the shortened row, a tooltip with the complete row will appear. 

### Events

Once the advanced-sheet is loaded, the event sheetLoaded is emitted. Once it is emited, you can pass data to the advanced-sheet component earlier.
During developpement we used it like this:

```html

<script>

	document.addEventListener('sheetLoaded',function(){
		let sheet = document.getElementsByTagName('advanced-sheet')[0];
    	sheet.data = {"data":[{"_id":"little_bird", "name": "titi", "color":"yellow"}]};
	})

</script>

```

## Release notes

v0.0.1 -> v0.0.2

Prototype of the advanced-sheet-handler component

v0.0.3 -> v0.0.4

Component compatible with bootstrap version 3.3.7

v0.1.0

ngl dependency added, we can see view pdb files by modifying the .pdbFile property.

v0.1.1

try to allow to have multiple ngl view

v0.2.0

nglview property added
Now there is only one ngl view that is updated when switching sheet.

v0.2.1

better rendering with bootstrap  

v0.3.0

A message is now appearing when a pdbfile is not available. The rendering should be better than in previous version.

v0.4.0

New functionnality : it is now possible to delete a sheet we don't want to have anymore

v0.5.0

New functionnality : it is now possible to choose a number of window that must be shown at the same time. You can do it with the parameter max_window. 
When the number of windows go over this limit, old windows are hidden and arrows are displayed in order to navigate into all the windows.  

v0.6.0

Addition of max_char property and the tooltip appearing when needed
