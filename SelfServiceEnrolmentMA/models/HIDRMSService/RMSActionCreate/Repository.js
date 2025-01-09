define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function RMSActionCreateRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	RMSActionCreateRepository.prototype = Object.create(BaseRepository.prototype);
	RMSActionCreateRepository.prototype.constructor = RMSActionCreateRepository;

	//For Operation 'rmsActionCreate' with service id 'actionCreate2329'
	RMSActionCreateRepository.prototype.rmsActionCreate = function(params, onCompletion){
		return RMSActionCreateRepository.prototype.customVerb('rmsActionCreate', params, onCompletion);
	};

	return RMSActionCreateRepository;
})