define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function Payment_MultiRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	Payment_MultiRepository.prototype = Object.create(BaseRepository.prototype);
	Payment_MultiRepository.prototype.constructor = Payment_MultiRepository;

	//For Operation 'createMultiTransfers' with service id 'createBulkTransfer7296'
	Payment_MultiRepository.prototype.createMultiTransfers = function(params, onCompletion){
		return Payment_MultiRepository.prototype.customVerb('createMultiTransfers', params, onCompletion);
	};

	return Payment_MultiRepository;
})