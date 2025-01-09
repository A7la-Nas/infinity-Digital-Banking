define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ACHTransactionsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ACHTransactionsRepository.prototype = Object.create(BaseRepository.prototype);
	ACHTransactionsRepository.prototype.constructor = ACHTransactionsRepository;

	//For Operation 'getACHTransactionDetailsById' with service id 'FetchACHTransactionById1224'
	ACHTransactionsRepository.prototype.getACHTransactionDetailsById = function(params, onCompletion){
		return ACHTransactionsRepository.prototype.customVerb('getACHTransactionDetailsById', params, onCompletion);
	};

	//For Operation 'createACHTransaction' with service id 'createTransaction2519'
	ACHTransactionsRepository.prototype.createACHTransaction = function(params, onCompletion){
		return ACHTransactionsRepository.prototype.customVerb('createACHTransaction', params, onCompletion);
	};

	//For Operation 'getAllACHTransactions' with service id 'FetchAllACHTransactions5918'
	ACHTransactionsRepository.prototype.getAllACHTransactions = function(params, onCompletion){
		return ACHTransactionsRepository.prototype.customVerb('getAllACHTransactions', params, onCompletion);
	};

	//For Operation 'RejectedTransactions' with service id 'FetchAllRejectedACHTransactions9987'
	ACHTransactionsRepository.prototype.RejectedTransactions = function(params, onCompletion){
		return ACHTransactionsRepository.prototype.customVerb('RejectedTransactions', params, onCompletion);
	};

	//For Operation 'SaveAsTemplate' with service id 'SaveTransactionAsTemplate3794'
	ACHTransactionsRepository.prototype.SaveAsTemplate = function(params, onCompletion){
		return ACHTransactionsRepository.prototype.customVerb('SaveAsTemplate', params, onCompletion);
	};

	return ACHTransactionsRepository;
})