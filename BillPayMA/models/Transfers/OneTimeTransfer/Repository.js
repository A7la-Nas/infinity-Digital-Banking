define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function OneTimeTransferRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	OneTimeTransferRepository.prototype = Object.create(BaseRepository.prototype);
	OneTimeTransferRepository.prototype.constructor = OneTimeTransferRepository;

	//For Operation 'Create' with service id 'oneTimeTransferFunds8861'
	OneTimeTransferRepository.prototype.Create = function(params, onCompletion){
		return OneTimeTransferRepository.prototype.customVerb('Create', params, onCompletion);
	};

	//For Operation 'getTransfers' with service id 'GetTransfers4936'
	OneTimeTransferRepository.prototype.getTransfers = function(params, onCompletion){
		return OneTimeTransferRepository.prototype.customVerb('getTransfers', params, onCompletion);
	};

	return OneTimeTransferRepository;
})