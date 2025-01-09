define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function MyApprovalsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	MyApprovalsRepository.prototype = Object.create(BaseRepository.prototype);
	MyApprovalsRepository.prototype.constructor = MyApprovalsRepository;

	//For Operation 'getRejectedACHTransactions' with service id 'fetchRejectedACHTransactions9465'
	MyApprovalsRepository.prototype.getRejectedACHTransactions = function(params, onCompletion){
		return MyApprovalsRepository.prototype.customVerb('getRejectedACHTransactions', params, onCompletion);
	};

	//For Operation 'approveBBGeneralTransaction' with service id 'ApproveGeneralTransaction8395'
	MyApprovalsRepository.prototype.approveBBGeneralTransaction = function(params, onCompletion){
		return MyApprovalsRepository.prototype.customVerb('approveBBGeneralTransaction', params, onCompletion);
	};

	//For Operation 'fetchAllMyPendingApprovals' with service id 'FetchAllMyPendingApprovals7716'
	MyApprovalsRepository.prototype.fetchAllMyPendingApprovals = function(params, onCompletion){
		return MyApprovalsRepository.prototype.customVerb('fetchAllMyPendingApprovals', params, onCompletion);
	};

	//For Operation 'rejectBBGeneralTransaction' with service id 'RejectGeneralTransaction1569'
	MyApprovalsRepository.prototype.rejectBBGeneralTransaction = function(params, onCompletion){
		return MyApprovalsRepository.prototype.customVerb('rejectBBGeneralTransaction', params, onCompletion);
	};

	//For Operation 'getACHTransactionsForApproval' with service id 'fetchACHTransactionsPendingForMyApproval3606'
	MyApprovalsRepository.prototype.getACHTransactionsForApproval = function(params, onCompletion){
		return MyApprovalsRepository.prototype.customVerb('getACHTransactionsForApproval', params, onCompletion);
	};

	//For Operation 'RejectedFiles' with service id 'fetchRejectedACHFiles4471'
	MyApprovalsRepository.prototype.RejectedFiles = function(params, onCompletion){
		return MyApprovalsRepository.prototype.customVerb('RejectedFiles', params, onCompletion);
	};

	//For Operation 'fetchAllMyApprovalHistory' with service id 'FetchAllMyApprovalHistory4528'
	MyApprovalsRepository.prototype.fetchAllMyApprovalHistory = function(params, onCompletion){
		return MyApprovalsRepository.prototype.customVerb('fetchAllMyApprovalHistory', params, onCompletion);
	};

	//For Operation 'getACHTransactionsPendingForApproval' with service id 'fetchACHTransactionsPendingForMyApproval8936'
	MyApprovalsRepository.prototype.getACHTransactionsPendingForApproval = function(params, onCompletion){
		return MyApprovalsRepository.prototype.customVerb('getACHTransactionsPendingForApproval', params, onCompletion);
	};

	//For Operation 'rejectACHTransaction' with service id 'rejectACHRequest5034'
	MyApprovalsRepository.prototype.rejectACHTransaction = function(params, onCompletion){
		return MyApprovalsRepository.prototype.customVerb('rejectACHTransaction', params, onCompletion);
	};

	//For Operation 'getACHFiles' with service id 'fetchACHFilesPendingForMyApproval7034'
	MyApprovalsRepository.prototype.getACHFiles = function(params, onCompletion){
		return MyApprovalsRepository.prototype.customVerb('getACHFiles', params, onCompletion);
	};

	//For Operation 'approveACHTransaction' with service id 'approveACHRequest1386'
	MyApprovalsRepository.prototype.approveACHTransaction = function(params, onCompletion){
		return MyApprovalsRepository.prototype.customVerb('approveACHTransaction', params, onCompletion);
	};

	//For Operation 'Reject' with service id 'Reject1085'
	MyApprovalsRepository.prototype.Reject = function(params, onCompletion){
		return MyApprovalsRepository.prototype.customVerb('Reject', params, onCompletion);
	};

	//For Operation 'approveACHFile' with service id 'ApproveACHFileRequest4081'
	MyApprovalsRepository.prototype.approveACHFile = function(params, onCompletion){
		return MyApprovalsRepository.prototype.customVerb('approveACHFile', params, onCompletion);
	};

	//For Operation 'rejectACHFile' with service id 'RejectACHFileRequest3734'
	MyApprovalsRepository.prototype.rejectACHFile = function(params, onCompletion){
		return MyApprovalsRepository.prototype.customVerb('rejectACHFile', params, onCompletion);
	};

	//For Operation 'getGeneralTransactions' with service id 'FetchGeneralTransactionsPendingForMyApproval8131'
	MyApprovalsRepository.prototype.getGeneralTransactions = function(params, onCompletion){
		return MyApprovalsRepository.prototype.customVerb('getGeneralTransactions', params, onCompletion);
	};

	//For Operation 'Approve' with service id 'Approve2924'
	MyApprovalsRepository.prototype.Approve = function(params, onCompletion){
		return MyApprovalsRepository.prototype.customVerb('Approve', params, onCompletion);
	};

	return MyApprovalsRepository;
})