define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function PaymentAllocationsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	PaymentAllocationsRepository.prototype = Object.create(BaseRepository.prototype);
	PaymentAllocationsRepository.prototype.constructor = PaymentAllocationsRepository;

	//For Operation 'requestDocumentation' with service id 'RequestPaymentAllocationDocumentsOperation1299'
	PaymentAllocationsRepository.prototype.requestDocumentation = function(params, onCompletion){
		return PaymentAllocationsRepository.prototype.customVerb('requestDocumentation', params, onCompletion);
	};

	//For Operation 'submitDocumentation' with service id 'SubmitPaymentAllocationDocumentsOperation9139'
	PaymentAllocationsRepository.prototype.submitDocumentation = function(params, onCompletion){
		return PaymentAllocationsRepository.prototype.customVerb('submitDocumentation', params, onCompletion);
	};

	//For Operation 'getPaymentAllocations' with service id 'GetPaymentAllocationsOperation3619'
	PaymentAllocationsRepository.prototype.getPaymentAllocations = function(params, onCompletion){
		return PaymentAllocationsRepository.prototype.customVerb('getPaymentAllocations', params, onCompletion);
	};

	return PaymentAllocationsRepository;
})