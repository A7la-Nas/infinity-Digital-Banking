define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function AnchorFundingInvoicesRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	AnchorFundingInvoicesRepository.prototype = Object.create(BaseRepository.prototype);
	AnchorFundingInvoicesRepository.prototype.constructor = AnchorFundingInvoicesRepository;

	//For Operation 'SubmitAll' with service id 'SubmitAnchorFundingInvoices3972'
	AnchorFundingInvoicesRepository.prototype.SubmitAll = function(params, onCompletion){
		return AnchorFundingInvoicesRepository.prototype.customVerb('SubmitAll', params, onCompletion);
	};

	//For Operation 'Reject' with service id 'RejectAnchorInvoices1442'
	AnchorFundingInvoicesRepository.prototype.Reject = function(params, onCompletion){
		return AnchorFundingInvoicesRepository.prototype.customVerb('Reject', params, onCompletion);
	};

	//For Operation 'GetLiveInvoices' with service id 'GetInvoiceCapture2018'
	AnchorFundingInvoicesRepository.prototype.GetLiveInvoices = function(params, onCompletion){
		return AnchorFundingInvoicesRepository.prototype.customVerb('GetLiveInvoices', params, onCompletion);
	};

	//For Operation 'ParseBulkUploadedXlsx' with service id 'ParseBulkUploadedXlsxOperation7141'
	AnchorFundingInvoicesRepository.prototype.ParseBulkUploadedXlsx = function(params, onCompletion){
		return AnchorFundingInvoicesRepository.prototype.customVerb('ParseBulkUploadedXlsx', params, onCompletion);
	};

	//For Operation 'DownloadSampleXlsx' with service id 'DownloadSampleXlsxOperation6394'
	AnchorFundingInvoicesRepository.prototype.DownloadSampleXlsx = function(params, onCompletion){
		return AnchorFundingInvoicesRepository.prototype.customVerb('DownloadSampleXlsx', params, onCompletion);
	};

	//For Operation 'GetAll' with service id 'GetAllFundingInvoicesOperation5523'
	AnchorFundingInvoicesRepository.prototype.GetAll = function(params, onCompletion){
		return AnchorFundingInvoicesRepository.prototype.customVerb('GetAll', params, onCompletion);
	};

	//For Operation 'Save' with service id 'SaveFundingInvoiceOperation7985'
	AnchorFundingInvoicesRepository.prototype.Save = function(params, onCompletion){
		return AnchorFundingInvoicesRepository.prototype.customVerb('Save', params, onCompletion);
	};

	//For Operation 'CreateBulkInvoices' with service id 'CreateBulkInvoices3024'
	AnchorFundingInvoicesRepository.prototype.CreateBulkInvoices = function(params, onCompletion){
		return AnchorFundingInvoicesRepository.prototype.customVerb('CreateBulkInvoices', params, onCompletion);
	};

	//For Operation 'Approve' with service id 'ApproveAnchorInvoiceOperation7798'
	AnchorFundingInvoicesRepository.prototype.Approve = function(params, onCompletion){
		return AnchorFundingInvoicesRepository.prototype.customVerb('Approve', params, onCompletion);
	};

	return AnchorFundingInvoicesRepository;
})