define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function PaymentAdviceRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	PaymentAdviceRepository.prototype = Object.create(BaseRepository.prototype);
	PaymentAdviceRepository.prototype.constructor = PaymentAdviceRepository;

	//For Operation 'createPaymentAdvice' with service id 'createPaymentAdvice2328'
	PaymentAdviceRepository.prototype.createPaymentAdvice = function(params, onCompletion){
		return PaymentAdviceRepository.prototype.customVerb('createPaymentAdvice', params, onCompletion);
	};

	//For Operation 'getPaymentAdvice' with service id 'GetPaymentAdvice9024'
	PaymentAdviceRepository.prototype.getPaymentAdvice = function(params, onCompletion){
		return PaymentAdviceRepository.prototype.customVerb('getPaymentAdvice', params, onCompletion);
	};

	return PaymentAdviceRepository;
})