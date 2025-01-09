define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function Payment_P2PListRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	Payment_P2PListRepository.prototype = Object.create(BaseRepository.prototype);
	Payment_P2PListRepository.prototype.constructor = Payment_P2PListRepository;

	//For Operation 'updateTransfer' with service id 'deleteTransaction4099'
	Payment_P2PListRepository.prototype.updateTransfer = function(params, onCompletion){
		return Payment_P2PListRepository.prototype.customVerb('updateTransfer', params, onCompletion);
	};

	//For Operation 'getTransfers' with service id 'getPayPersonHistory1790'
	Payment_P2PListRepository.prototype.getTransfers = function(params, onCompletion){
		return Payment_P2PListRepository.prototype.customVerb('getTransfers', params, onCompletion);
	};

	return Payment_P2PListRepository;
})