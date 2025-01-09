define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function BulkPaymentRecordRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	BulkPaymentRecordRepository.prototype = Object.create(BaseRepository.prototype);
	BulkPaymentRecordRepository.prototype.constructor = BulkPaymentRecordRepository;

	//For Operation 'fetchOnGoingPayments' with service id 'fetchOnGoingPayments4456'
	BulkPaymentRecordRepository.prototype.fetchOnGoingPayments = function(params, onCompletion){
		return BulkPaymentRecordRepository.prototype.customVerb('fetchOnGoingPayments', params, onCompletion);
	};

	//For Operation 'updateBulkPaymentRecord' with service id 'updateBulkPaymentRecord9284'
	BulkPaymentRecordRepository.prototype.updateBulkPaymentRecord = function(params, onCompletion){
		return BulkPaymentRecordRepository.prototype.customVerb('updateBulkPaymentRecord', params, onCompletion);
	};

	//For Operation 'fetchHistory' with service id 'fetchHistory1432'
	BulkPaymentRecordRepository.prototype.fetchHistory = function(params, onCompletion){
		return BulkPaymentRecordRepository.prototype.customVerb('fetchHistory', params, onCompletion);
	};

	//For Operation 'fetchCancellationReasons' with service id 'fetchCancellationReasons7653'
	BulkPaymentRecordRepository.prototype.fetchCancellationReasons = function(params, onCompletion){
		return BulkPaymentRecordRepository.prototype.customVerb('fetchCancellationReasons', params, onCompletion);
	};

	//For Operation 'fetchRecordHistoryReviewedByMe' with service id 'fetchRequestHistory7586'
	BulkPaymentRecordRepository.prototype.fetchRecordHistoryReviewedByMe = function(params, onCompletion){
		return BulkPaymentRecordRepository.prototype.customVerb('fetchRecordHistoryReviewedByMe', params, onCompletion);
	};

	//For Operation 'cancelBulkPaymentRecord' with service id 'cancelBulkPaymentRecord3272'
	BulkPaymentRecordRepository.prototype.cancelBulkPaymentRecord = function(params, onCompletion){
		return BulkPaymentRecordRepository.prototype.customVerb('cancelBulkPaymentRecord', params, onCompletion);
	};

	//For Operation 'review' with service id 'reviewBulkPaymentRecord9883'
	BulkPaymentRecordRepository.prototype.review = function(params, onCompletion){
		return BulkPaymentRecordRepository.prototype.customVerb('review', params, onCompletion);
	};

	//For Operation 'fetchRecordHistoryActedByMe' with service id 'fetchApprovalHistory2169'
	BulkPaymentRecordRepository.prototype.fetchRecordHistoryActedByMe = function(params, onCompletion){
		return BulkPaymentRecordRepository.prototype.customVerb('fetchRecordHistoryActedByMe', params, onCompletion);
	};

	//For Operation 'fetchBulkPaymentRecordDetailsById' with service id 'fetchBulkPaymentRecordById9835'
	BulkPaymentRecordRepository.prototype.fetchBulkPaymentRecordDetailsById = function(params, onCompletion){
		return BulkPaymentRecordRepository.prototype.customVerb('fetchBulkPaymentRecordDetailsById', params, onCompletion);
	};

	//For Operation 'rejectBulkPaymentRecord' with service id 'rejectBulkPaymentRecord1663'
	BulkPaymentRecordRepository.prototype.rejectBulkPaymentRecord = function(params, onCompletion){
		return BulkPaymentRecordRepository.prototype.customVerb('rejectBulkPaymentRecord', params, onCompletion);
	};

	//For Operation 'approveBulkPaymentRecord' with service id 'approveBulkPaymentRecord8783'
	BulkPaymentRecordRepository.prototype.approveBulkPaymentRecord = function(params, onCompletion){
		return BulkPaymentRecordRepository.prototype.customVerb('approveBulkPaymentRecord', params, onCompletion);
	};

	//For Operation 'fetchRecordsWaitingForMyApproval' with service id 'fetchPendingApprovals9027'
	BulkPaymentRecordRepository.prototype.fetchRecordsWaitingForMyApproval = function(params, onCompletion){
		return BulkPaymentRecordRepository.prototype.customVerb('fetchRecordsWaitingForMyApproval', params, onCompletion);
	};

	//For Operation 'fetchRecordsReviewedByMeAndInApprovalQueue' with service id 'fetchPendingRequests2527'
	BulkPaymentRecordRepository.prototype.fetchRecordsReviewedByMeAndInApprovalQueue = function(params, onCompletion){
		return BulkPaymentRecordRepository.prototype.customVerb('fetchRecordsReviewedByMeAndInApprovalQueue', params, onCompletion);
	};

	return BulkPaymentRecordRepository;
})