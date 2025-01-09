define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function CardlessTransactionRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	CardlessTransactionRepository.prototype = Object.create(BaseRepository.prototype);
	CardlessTransactionRepository.prototype.constructor = CardlessTransactionRepository;

	//For Operation 'createCardlessTransaction' with service id 'createTransfer6131'
	CardlessTransactionRepository.prototype.createCardlessTransaction = function(params, onCompletion){
		return CardlessTransactionRepository.prototype.customVerb('createCardlessTransaction', params, onCompletion);
	};

	//For Operation 'getPostedCardlessTransactions' with service id 'getPostedCardlessTransactions9053'
	CardlessTransactionRepository.prototype.getPostedCardlessTransactions = function(params, onCompletion){
		return CardlessTransactionRepository.prototype.customVerb('getPostedCardlessTransactions', params, onCompletion);
	};

	//For Operation 'getPendingCardlessTransactions' with service id 'getPendingCardlessTransactions8675'
	CardlessTransactionRepository.prototype.getPendingCardlessTransactions = function(params, onCompletion){
		return CardlessTransactionRepository.prototype.customVerb('getPendingCardlessTransactions', params, onCompletion);
	};

	//For Operation 'deleteCardlessTransaction' with service id 'deleteTransaction2368'
	CardlessTransactionRepository.prototype.deleteCardlessTransaction = function(params, onCompletion){
		return CardlessTransactionRepository.prototype.customVerb('deleteCardlessTransaction', params, onCompletion);
	};

	return CardlessTransactionRepository;
})