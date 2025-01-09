define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function RMSActionSignRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	RMSActionSignRepository.prototype = Object.create(BaseRepository.prototype);
	RMSActionSignRepository.prototype.constructor = RMSActionSignRepository;

	//For Operation 'rmsActionSign' with service id 'actionSign4171'
	RMSActionSignRepository.prototype.rmsActionSign = function(params, onCompletion){
		return RMSActionSignRepository.prototype.customVerb('rmsActionSign', params, onCompletion);
	};

	return RMSActionSignRepository;
})