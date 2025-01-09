define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ExternalCodesRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ExternalCodesRepository.prototype = Object.create(BaseRepository.prototype);
	ExternalCodesRepository.prototype.constructor = ExternalCodesRepository;

	//For Operation 'getPurposeCodes' with service id 'getPurposeCodes4123'
	ExternalCodesRepository.prototype.getPurposeCodes = function(params, onCompletion){
		return ExternalCodesRepository.prototype.customVerb('getPurposeCodes', params, onCompletion);
	};

	//For Operation 'getExternalCodes' with service id 'getExternalCodes9087'
	ExternalCodesRepository.prototype.getExternalCodes = function(params, onCompletion){
		return ExternalCodesRepository.prototype.customVerb('getExternalCodes', params, onCompletion);
	};

	return ExternalCodesRepository;
})