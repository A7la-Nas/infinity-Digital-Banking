define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function Payment_BillPayListRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	Payment_BillPayListRepository.prototype = Object.create(BaseRepository.prototype);
	Payment_BillPayListRepository.prototype.constructor = Payment_BillPayListRepository;

	//For Operation 'getCompletedPayments' with service id 'getUserCompletedBillHistory4421'
	Payment_BillPayListRepository.prototype.getCompletedPayments = function(params, onCompletion){
		return Payment_BillPayListRepository.prototype.customVerb('getCompletedPayments', params, onCompletion);
	};

	//For Operation 'getScheduledPayments' with service id 'getUsersScheduledBills6630'
	Payment_BillPayListRepository.prototype.getScheduledPayments = function(params, onCompletion){
		return Payment_BillPayListRepository.prototype.customVerb('getScheduledPayments', params, onCompletion);
	};

	//For Operation 'getPayeePayments' with service id 'getPayeeBills2483'
	Payment_BillPayListRepository.prototype.getPayeePayments = function(params, onCompletion){
		return Payment_BillPayListRepository.prototype.customVerb('getPayeePayments', params, onCompletion);
	};

	return Payment_BillPayListRepository;
})