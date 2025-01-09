define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function LCImportDrawingSummaryRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	LCImportDrawingSummaryRepository.prototype = Object.create(BaseRepository.prototype);
	LCImportDrawingSummaryRepository.prototype.constructor = LCImportDrawingSummaryRepository;

	//For Operation 'generate' with service id 'generate3674'
	LCImportDrawingSummaryRepository.prototype.generate = function(params, onCompletion){
		return LCImportDrawingSummaryRepository.prototype.customVerb('generate', params, onCompletion);
	};

	return LCImportDrawingSummaryRepository;
})