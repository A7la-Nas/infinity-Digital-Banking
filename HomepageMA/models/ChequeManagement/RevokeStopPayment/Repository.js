define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function RevokeStopPaymentRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	RevokeStopPaymentRepository.prototype = Object.create(BaseRepository.prototype);
	RevokeStopPaymentRepository.prototype.constructor = RevokeStopPaymentRepository;

	//For Operation 'createRequest' with service id 'revokeStopPaymentRequest5134'
	RevokeStopPaymentRepository.prototype.createRequest = function(params, onCompletion){
		return RevokeStopPaymentRepository.prototype.customVerb('createRequest', params, onCompletion);
	};

	return RevokeStopPaymentRepository;
})