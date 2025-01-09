define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function StopPaymentRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	StopPaymentRepository.prototype = Object.create(BaseRepository.prototype);
	StopPaymentRepository.prototype.constructor = StopPaymentRepository;

	//For Operation 'createRequest' with service id 'CreateStopPaymentRequest7270'
	StopPaymentRepository.prototype.createRequest = function(params, onCompletion){
		return StopPaymentRepository.prototype.customVerb('createRequest', params, onCompletion);
	};

	//For Operation 'getRequest' with service id 'getStopChequeRequests8912'
	StopPaymentRepository.prototype.getRequest = function(params, onCompletion){
		return StopPaymentRepository.prototype.customVerb('getRequest', params, onCompletion);
	};

	return StopPaymentRepository;
})