define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function Payment_P2PRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	Payment_P2PRepository.prototype = Object.create(BaseRepository.prototype);
	Payment_P2PRepository.prototype.constructor = Payment_P2PRepository;

	//For Operation 'createTransfer' with service id 'CreateP2PTransaction6580'
	Payment_P2PRepository.prototype.createTransfer = function(params, onCompletion){
		return Payment_P2PRepository.prototype.customVerb('createTransfer', params, onCompletion);
	};

	return Payment_P2PRepository;
})