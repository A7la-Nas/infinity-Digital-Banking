define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ReceivablesRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ReceivablesRepository.prototype = Object.create(BaseRepository.prototype);
	ReceivablesRepository.prototype.constructor = ReceivablesRepository;

	//For Operation 'getAccountsReceivable' with service id 'getAccountsReceivable4680'
	ReceivablesRepository.prototype.getAccountsReceivable = function(params, onCompletion){
		return ReceivablesRepository.prototype.customVerb('getAccountsReceivable', params, onCompletion);
	};

	//For Operation 'getReceivablesDebtorDaysReq' with service id 'getReceivablesDebtorDaysReq4408'
	ReceivablesRepository.prototype.getReceivablesDebtorDaysReq = function(params, onCompletion){
		return ReceivablesRepository.prototype.customVerb('getReceivablesDebtorDaysReq', params, onCompletion);
	};

	//For Operation 'getAccountsReceivableCustomerDetailsExcel' with service id 'getAccountsReceivaleCustomerDetailsExcel7027'
	ReceivablesRepository.prototype.getAccountsReceivableCustomerDetailsExcel = function(params, onCompletion){
		return ReceivablesRepository.prototype.customVerb('getAccountsReceivableCustomerDetailsExcel', params, onCompletion);
	};

	//For Operation 'getAccountsReceivableByCustomer' with service id 'getAccountsReceivableByCustomer6320'
	ReceivablesRepository.prototype.getAccountsReceivableByCustomer = function(params, onCompletion){
		return ReceivablesRepository.prototype.customVerb('getAccountsReceivableByCustomer', params, onCompletion);
	};

	//For Operation 'getAccountsReceivaleSummaryExcel' with service id 'getAccountsReceivaleSummaryExcel3278'
	ReceivablesRepository.prototype.getAccountsReceivaleSummaryExcel = function(params, onCompletion){
		return ReceivablesRepository.prototype.customVerb('getAccountsReceivaleSummaryExcel', params, onCompletion);
	};

	return ReceivablesRepository;
})