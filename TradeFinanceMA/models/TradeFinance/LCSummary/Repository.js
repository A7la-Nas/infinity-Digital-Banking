define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function LCSummaryRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	LCSummaryRepository.prototype = Object.create(BaseRepository.prototype);
	LCSummaryRepository.prototype.constructor = LCSummaryRepository;

	//For Operation 'downloadGeneratedList' with service id 'downloadGeneratedList5238'
	LCSummaryRepository.prototype.downloadGeneratedList = function(params, onCompletion){
		return LCSummaryRepository.prototype.customVerb('downloadGeneratedList', params, onCompletion);
	};

	//For Operation 'generateGuaranteesList' with service id 'generateGuaranteesList8630'
	LCSummaryRepository.prototype.generateGuaranteesList = function(params, onCompletion){
		return LCSummaryRepository.prototype.customVerb('generateGuaranteesList', params, onCompletion);
	};

	//For Operation 'generateImportDrawingsList' with service id 'generateImportDrawingsList3990'
	LCSummaryRepository.prototype.generateImportDrawingsList = function(params, onCompletion){
		return LCSummaryRepository.prototype.customVerb('generateImportDrawingsList', params, onCompletion);
	};

	//For Operation 'downloadGeneratedAcknowledgement' with service id 'downloadGeneratedAcknowledgement9968'
	LCSummaryRepository.prototype.downloadGeneratedAcknowledgement = function(params, onCompletion){
		return LCSummaryRepository.prototype.customVerb('downloadGeneratedAcknowledgement', params, onCompletion);
	};

	//For Operation 'generateExportAmendmentList' with service id 'generateExportAmendmentsList4674'
	LCSummaryRepository.prototype.generateExportAmendmentList = function(params, onCompletion){
		return LCSummaryRepository.prototype.customVerb('generateExportAmendmentList', params, onCompletion);
	};

	//For Operation 'generateImportLCAmendment' with service id 'GenerateImportLCAmendments8337'
	LCSummaryRepository.prototype.generateImportLCAmendment = function(params, onCompletion){
		return LCSummaryRepository.prototype.customVerb('generateImportLCAmendment', params, onCompletion);
	};

	//For Operation 'generateImportAmendmentsList' with service id 'generateImportAmendmentsList4917'
	LCSummaryRepository.prototype.generateImportAmendmentsList = function(params, onCompletion){
		return LCSummaryRepository.prototype.customVerb('generateImportAmendmentsList', params, onCompletion);
	};

	//For Operation 'generateExportLC' with service id 'GenerateExportLCPdf5609'
	LCSummaryRepository.prototype.generateExportLC = function(params, onCompletion){
		return LCSummaryRepository.prototype.customVerb('generateExportLC', params, onCompletion);
	};

	//For Operation 'generateExportDrawingsList' with service id 'generateExportDrawingsList8753'
	LCSummaryRepository.prototype.generateExportDrawingsList = function(params, onCompletion){
		return LCSummaryRepository.prototype.customVerb('generateExportDrawingsList', params, onCompletion);
	};

	//For Operation 'generateImportLetterOfCreditsList' with service id 'generateImportLetterOfCreditsList8491'
	LCSummaryRepository.prototype.generateImportLetterOfCreditsList = function(params, onCompletion){
		return LCSummaryRepository.prototype.customVerb('generateImportLetterOfCreditsList', params, onCompletion);
	};

	//For Operation 'generate' with service id 'initiateDownloadTradeFinanceAck3435'
	LCSummaryRepository.prototype.generate = function(params, onCompletion){
		return LCSummaryRepository.prototype.customVerb('generate', params, onCompletion);
	};

	//For Operation 'generateExportLetterOfCreditList' with service id 'generateExportLetterOfCreditList5302'
	LCSummaryRepository.prototype.generateExportLetterOfCreditList = function(params, onCompletion){
		return LCSummaryRepository.prototype.customVerb('generateExportLetterOfCreditList', params, onCompletion);
	};

	return LCSummaryRepository;
})