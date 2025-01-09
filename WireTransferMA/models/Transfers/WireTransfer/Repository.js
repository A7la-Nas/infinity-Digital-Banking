define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function WireTransferRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	WireTransferRepository.prototype = Object.create(BaseRepository.prototype);
	WireTransferRepository.prototype.constructor = WireTransferRepository;

	//For Operation 'getUserWiredTransactions' with service id 'getUserWiredTransactions2211'
	WireTransferRepository.prototype.getUserWiredTransactions = function(params, onCompletion){
		return WireTransferRepository.prototype.customVerb('getUserWiredTransactions', params, onCompletion);
	};

	return WireTransferRepository;
})