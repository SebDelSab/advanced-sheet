exports.config = {
	bundles:[
	{components :['advanced-sheet','advanced-sheet-handler']},
	],
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
