define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function PaymentOrderRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	PaymentOrderRepository.prototype = Object.create(BaseRepository.prototype);
	PaymentOrderRepository.prototype.constructor = PaymentOrderRepository;

	//For Operation 'editPaymentOrder' with service id 'editPaymentOrder9459'
	PaymentOrderRepository.prototype.editPaymentOrder = function(params, onCompletion){
		return PaymentOrderRepository.prototype.customVerb('editPaymentOrder', params, onCompletion);
	};

	//For Operation 'deletePaymentOrder' with service id 'deletePaymentOrder6828'
	PaymentOrderRepository.prototype.deletePaymentOrder = function(params, onCompletion){
		return PaymentOrderRepository.prototype.customVerb('deletePaymentOrder', params, onCompletion);
	};

	//For Operation 'addPaymentOrder' with service id 'addPaymentOrder8872'
	PaymentOrderRepository.prototype.addPaymentOrder = function(params, onCompletion){
		return PaymentOrderRepository.prototype.customVerb('addPaymentOrder', params, onCompletion);
	};

	//For Operation 'fetchPaymentOrders' with service id 'fetchPaymentOrders8855'
	PaymentOrderRepository.prototype.fetchPaymentOrders = function(params, onCompletion){
		return PaymentOrderRepository.prototype.customVerb('fetchPaymentOrders', params, onCompletion);
	};

	return PaymentOrderRepository;
})