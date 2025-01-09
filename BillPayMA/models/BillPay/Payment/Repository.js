define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function PaymentRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	PaymentRepository.prototype = Object.create(BaseRepository.prototype);
	PaymentRepository.prototype.constructor = PaymentRepository;

	//For Operation 'createPayment_bulk' with service id 'CreateBulkBillPayTransactions8335'
	PaymentRepository.prototype.createPayment_bulk = function(params, onCompletion){
		return PaymentRepository.prototype.customVerb('createPayment_bulk', params, onCompletion);
	};

	//For Operation 'createPayment' with service id 'CreateBillPayTransaction6935'
	PaymentRepository.prototype.createPayment = function(params, onCompletion){
		return PaymentRepository.prototype.customVerb('createPayment', params, onCompletion);
	};

	//For Operation 'updatePayment' with service id 'EditBillPayTransaction1385'
	PaymentRepository.prototype.updatePayment = function(params, onCompletion){
		return PaymentRepository.prototype.customVerb('updatePayment', params, onCompletion);
	};

	//For Operation 'updatePayment_delete' with service id 'DeleteBillPayTransaction4861'
	PaymentRepository.prototype.updatePayment_delete = function(params, onCompletion){
		return PaymentRepository.prototype.customVerb('updatePayment_delete', params, onCompletion);
	};

	return PaymentRepository;
})