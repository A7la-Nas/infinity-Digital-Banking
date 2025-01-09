define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function TransactionsListRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	TransactionsListRepository.prototype = Object.create(BaseRepository.prototype);
	TransactionsListRepository.prototype.constructor = TransactionsListRepository;

	//For Operation 'getPostedUserTransactions' with service id 'searchTransactions1640'
	TransactionsListRepository.prototype.getPostedUserTransactions = function(params, onCompletion){
		return TransactionsListRepository.prototype.customVerb('getPostedUserTransactions', params, onCompletion);
	};

	//For Operation 'getDisputeRequest' with service id 'getOrderDetails5288'
	TransactionsListRepository.prototype.getDisputeRequest = function(params, onCompletion){
		return TransactionsListRepository.prototype.customVerb('getDisputeRequest', params, onCompletion);
	};

	//For Operation 'getUserScheduledTransactions' with service id 'upcomingTransactions9129'
	TransactionsListRepository.prototype.getUserScheduledTransactions = function(params, onCompletion){
		return TransactionsListRepository.prototype.customVerb('getUserScheduledTransactions', params, onCompletion);
	};

	//For Operation 'createDisputeRequest' with service id 'createOrder7224'
	TransactionsListRepository.prototype.createDisputeRequest = function(params, onCompletion){
		return TransactionsListRepository.prototype.customVerb('createDisputeRequest', params, onCompletion);
	};

	//For Operation 'getRecent' with service id 'getAccountPendingAndPostedTransactions8864'
	TransactionsListRepository.prototype.getRecent = function(params, onCompletion){
		return TransactionsListRepository.prototype.customVerb('getRecent', params, onCompletion);
	};

	//For Operation 'getPendingUserTransactions' with service id 'searchPendingUserTransactions2123'
	TransactionsListRepository.prototype.getPendingUserTransactions = function(params, onCompletion){
		return TransactionsListRepository.prototype.customVerb('getPendingUserTransactions', params, onCompletion);
	};

	return TransactionsListRepository;
})