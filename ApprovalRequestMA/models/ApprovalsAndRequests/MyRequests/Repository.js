define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function MyRequestsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	MyRequestsRepository.prototype = Object.create(BaseRepository.prototype);
	MyRequestsRepository.prototype.constructor = MyRequestsRepository;

	//For Operation 'withdrawACHTransaction' with service id 'WithdrawACHTransaction8126'
	MyRequestsRepository.prototype.withdrawACHTransaction = function(params, onCompletion){
		return MyRequestsRepository.prototype.customVerb('withdrawACHTransaction', params, onCompletion);
	};

	//For Operation 'getGeneralTransactionsRequestedByMe' with service id 'FetchGeneralTransactionRequests4687'
	MyRequestsRepository.prototype.getGeneralTransactionsRequestedByMe = function(params, onCompletion){
		return MyRequestsRepository.prototype.customVerb('getGeneralTransactionsRequestedByMe', params, onCompletion);
	};

	//For Operation 'getRequestsHistory' with service id 'fetchRequestHistory4976'
	MyRequestsRepository.prototype.getRequestsHistory = function(params, onCompletion){
		return MyRequestsRepository.prototype.customVerb('getRequestsHistory', params, onCompletion);
	};

	//For Operation 'Withdraw' with service id 'Withdraw6848'
	MyRequestsRepository.prototype.Withdraw = function(params, onCompletion){
		return MyRequestsRepository.prototype.customVerb('Withdraw', params, onCompletion);
	};

	//For Operation 'fetchAllMyRequestHistory' with service id 'FetchAllMyRequestHistory4312'
	MyRequestsRepository.prototype.fetchAllMyRequestHistory = function(params, onCompletion){
		return MyRequestsRepository.prototype.customVerb('fetchAllMyRequestHistory', params, onCompletion);
	};

	//For Operation 'fetchAllMyPendingRequests' with service id 'FetchAllMyPendingRequest4913'
	MyRequestsRepository.prototype.fetchAllMyPendingRequests = function(params, onCompletion){
		return MyRequestsRepository.prototype.customVerb('fetchAllMyPendingRequests', params, onCompletion);
	};

	//For Operation 'RenotifyPendingApprovalRequest' with service id 'RenotifyPendingApprovalRequest5051'
	MyRequestsRepository.prototype.RenotifyPendingApprovalRequest = function(params, onCompletion){
		return MyRequestsRepository.prototype.customVerb('RenotifyPendingApprovalRequest', params, onCompletion);
	};

	//For Operation 'getACHTransactionsRequestedByMe' with service id 'fetchACHTransactionRequests5665'
	MyRequestsRepository.prototype.getACHTransactionsRequestedByMe = function(params, onCompletion){
		return MyRequestsRepository.prototype.customVerb('getACHTransactionsRequestedByMe', params, onCompletion);
	};

	//For Operation 'withdrawGeneralTransaction' with service id 'WithdrawGeneralTransaction5083'
	MyRequestsRepository.prototype.withdrawGeneralTransaction = function(params, onCompletion){
		return MyRequestsRepository.prototype.customVerb('withdrawGeneralTransaction', params, onCompletion);
	};

	//For Operation 'withdrawACHFile' with service id 'WithdrawACHFile3979'
	MyRequestsRepository.prototype.withdrawACHFile = function(params, onCompletion){
		return MyRequestsRepository.prototype.customVerb('withdrawACHFile', params, onCompletion);
	};

	//For Operation 'getACHFilesRequestedByMe' with service id 'fetchACHFileRequests3808'
	MyRequestsRepository.prototype.getACHFilesRequestedByMe = function(params, onCompletion){
		return MyRequestsRepository.prototype.customVerb('getACHFilesRequestedByMe', params, onCompletion);
	};

	return MyRequestsRepository;
})