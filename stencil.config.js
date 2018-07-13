exports.config = {
	//namespace: 'advanced-sheet-handler',
	//generateDistribution: true,
	generateWWW: true,
	bundles:[
	{components :['advanced-sheet','advanced-sheet-handler']},
	],
	copy: [
	{src: "ngl"},
	{src: "pdb"}
	]
	
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};