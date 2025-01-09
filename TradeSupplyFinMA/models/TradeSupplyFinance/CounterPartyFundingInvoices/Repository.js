define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function CounterPartyFundingInvoicesRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	CounterPartyFundingInvoicesRepository.prototype = Object.create(BaseRepository.prototype);
	CounterPartyFundingInvoicesRepository.prototype.constructor = CounterPartyFundingInvoicesRepository;

	//For Operation 'SubmitAll' with service id 'SubmitCounterPartyFundingInvoices3973'
	CounterPartyFundingInvoicesRepository.prototype.SubmitAll = function(params, onCompletion){
		return CounterPartyFundingInvoicesRepository.prototype.customVerb('SubmitAll', params, onCompletion);
	};

	//For Operation 'DownloadSampleXlsx' with service id 'DownloadSampleXlsxOperation5709'
	CounterPartyFundingInvoicesRepository.prototype.DownloadSampleXlsx = function(params, onCompletion){
		return CounterPartyFundingInvoicesRepository.prototype.customVerb('DownloadSampleXlsx', params, onCompletion);
	};

	//For Operation 'ParseBulkUploadedXlsx' with service id 'ParseBulkUploadedXlsxOperation6546'
	CounterPartyFundingInvoicesRepository.prototype.ParseBulkUploadedXlsx = function(params, onCompletion){
		return CounterPartyFundingInvoicesRepository.prototype.customVerb('ParseBulkUploadedXlsx', params, onCompletion);
	};

	//For Operation 'GetAll' with service id 'GetAllFundingInvoicesOperation5524'
	CounterPartyFundingInvoicesRepository.prototype.GetAll = function(params, onCompletion){
		return CounterPartyFundingInvoicesRepository.prototype.customVerb('GetAll', params, onCompletion);
	};

	//For Operation 'Save' with service id 'SaveFundingInvoiceOperation7986'
	CounterPartyFundingInvoicesRepository.prototype.Save = function(params, onCompletion){
		return CounterPartyFundingInvoicesRepository.prototype.customVerb('Save', params, onCompletion);
	};

	//For Operation 'CreateBulkInvoices' with service id 'CreateBulkInvoices1513'
	CounterPartyFundingInvoicesRepository.prototype.CreateBulkInvoices = function(params, onCompletion){
		return CounterPartyFundingInvoicesRepository.prototype.customVerb('CreateBulkInvoices', params, onCompletion);
	};

	return CounterPartyFundingInvoicesRepository;
})