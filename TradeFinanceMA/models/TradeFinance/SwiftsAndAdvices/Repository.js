define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function SwiftsAndAdvicesRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	SwiftsAndAdvicesRepository.prototype = Object.create(BaseRepository.prototype);
	SwiftsAndAdvicesRepository.prototype.constructor = SwiftsAndAdvicesRepository;

	//For Operation 'fetchSwiftsAdvices' with service id 'fetchSwiftsAdvices7375'
	SwiftsAndAdvicesRepository.prototype.fetchSwiftsAdvices = function(params, onCompletion){
		return SwiftsAndAdvicesRepository.prototype.customVerb('fetchSwiftsAdvices', params, onCompletion);
	};

	//For Operation 'createSwiftsAndAdvices' with service id 'createImportLCDrawingSwiftsAndAdvices4499'
	SwiftsAndAdvicesRepository.prototype.createSwiftsAndAdvices = function(params, onCompletion){
		return SwiftsAndAdvicesRepository.prototype.customVerb('createSwiftsAndAdvices', params, onCompletion);
	};

	//For Operation 'uploadSwiftsAdvices' with service id 'uploadSwiftsAdvices9571'
	SwiftsAndAdvicesRepository.prototype.uploadSwiftsAdvices = function(params, onCompletion){
		return SwiftsAndAdvicesRepository.prototype.customVerb('uploadSwiftsAdvices', params, onCompletion);
	};

	//For Operation 'getSwiftsAndAdvices' with service id 'getImportLCDrawingSwiftsAndAdvices7670'
	SwiftsAndAdvicesRepository.prototype.getSwiftsAndAdvices = function(params, onCompletion){
		return SwiftsAndAdvicesRepository.prototype.customVerb('getSwiftsAndAdvices', params, onCompletion);
	};

	return SwiftsAndAdvicesRepository;
})