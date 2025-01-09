define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function Payee_BillPayRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	Payee_BillPayRepository.prototype = Object.create(BaseRepository.prototype);
	Payee_BillPayRepository.prototype.constructor = Payee_BillPayRepository;

	//For Operation 'getBillPayPayees' with service id 'getBillPayPayees1371'
	Payee_BillPayRepository.prototype.getBillPayPayees = function(params, onCompletion){
		return Payee_BillPayRepository.prototype.customVerb('getBillPayPayees', params, onCompletion);
	};

	//For Operation 'deleteBillPayPayee' with service id 'deleteBillPayPayee1101'
	Payee_BillPayRepository.prototype.deleteBillPayPayee = function(params, onCompletion){
		return Payee_BillPayRepository.prototype.customVerb('deleteBillPayPayee', params, onCompletion);
	};

	//For Operation 'updateBillPayPayee' with service id 'editBillPayPayee3027'
	Payee_BillPayRepository.prototype.updateBillPayPayee = function(params, onCompletion){
		return Payee_BillPayRepository.prototype.customVerb('updateBillPayPayee', params, onCompletion);
	};

	//For Operation 'createBillPayPayee' with service id 'createBillPayPayee3445'
	Payee_BillPayRepository.prototype.createBillPayPayee = function(params, onCompletion){
		return Payee_BillPayRepository.prototype.customVerb('createBillPayPayee', params, onCompletion);
	};

	return Payee_BillPayRepository;
})