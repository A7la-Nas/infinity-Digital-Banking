define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function PayablesRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	PayablesRepository.prototype = Object.create(BaseRepository.prototype);
	PayablesRepository.prototype.constructor = PayablesRepository;

	//For Operation 'getAccountsPayableSummaryExcel' with service id 'getAccountsPayableSummaryExcel2442'
	PayablesRepository.prototype.getAccountsPayableSummaryExcel = function(params, onCompletion){
		return PayablesRepository.prototype.customVerb('getAccountsPayableSummaryExcel', params, onCompletion);
	};

	//For Operation 'getAccountsPayableSupplierDetailsExcel' with service id 'getAccountsPayableSupplierDetailsExcel1136'
	PayablesRepository.prototype.getAccountsPayableSupplierDetailsExcel = function(params, onCompletion){
		return PayablesRepository.prototype.customVerb('getAccountsPayableSupplierDetailsExcel', params, onCompletion);
	};

	//For Operation 'getPayablesDebtorDaysReq' with service id 'getPayablesDebtorDaysReq6631'
	PayablesRepository.prototype.getPayablesDebtorDaysReq = function(params, onCompletion){
		return PayablesRepository.prototype.customVerb('getPayablesDebtorDaysReq', params, onCompletion);
	};

	//For Operation 'getAccountsPayableBySupplier' with service id 'getAccountsPayableBySupplier7194'
	PayablesRepository.prototype.getAccountsPayableBySupplier = function(params, onCompletion){
		return PayablesRepository.prototype.customVerb('getAccountsPayableBySupplier', params, onCompletion);
	};

	//For Operation 'getAccountsPayable' with service id 'getAccountsPayable3301'
	PayablesRepository.prototype.getAccountsPayable = function(params, onCompletion){
		return PayablesRepository.prototype.customVerb('getAccountsPayable', params, onCompletion);
	};

	return PayablesRepository;
})