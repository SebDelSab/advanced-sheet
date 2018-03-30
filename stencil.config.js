exports.config = {
	namespace: 'advanced-sheet-handler',
	generateDistribution: true,
	generateWWW: false,
	bundles:[
	{components :['advanced-sheet','advanced-sheet-handler']},
	],
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};