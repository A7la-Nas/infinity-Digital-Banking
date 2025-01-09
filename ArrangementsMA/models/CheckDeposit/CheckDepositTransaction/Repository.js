define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function CheckDepositTransactionRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	CheckDepositTransactionRepository.prototype = Object.create(BaseRepository.prototype);
	CheckDepositTransactionRepository.prototype.constructor = CheckDepositTransactionRepository;

	//For Operation 'getPostedDeposits' with service id 'getPostedDepositTransactions5158'
	CheckDepositTransactionRepository.prototype.getPostedDeposits = function(params, onCompletion){
		return CheckDepositTransactionRepository.prototype.customVerb('getPostedDeposits', params, onCompletion);
	};

	//For Operation 'getPendingDeposits' with service id 'getPendingDepositTransactions2065'
	CheckDepositTransactionRepository.prototype.getPendingDeposits = function(params, onCompletion){
		return CheckDepositTransactionRepository.prototype.customVerb('getPendingDeposits', params, onCompletion);
	};

	//For Operation 'createRDC' with service id 'createRDC3801'
	CheckDepositTransactionRepository.prototype.createRDC = function(params, onCompletion){
		return CheckDepositTransactionRepository.prototype.customVerb('createRDC', params, onCompletion);
	};

	return CheckDepositTransactionRepository;
})