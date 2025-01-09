define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ExportLetterOfCreditRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ExportLetterOfCreditRepository.prototype = Object.create(BaseRepository.prototype);
	ExportLetterOfCreditRepository.prototype.constructor = ExportLetterOfCreditRepository;

	//For Operation 'getExportLetterOfCreditDrawingById' with service id 'getExportLetterOfCreditDrawingById4170'
	ExportLetterOfCreditRepository.prototype.getExportLetterOfCreditDrawingById = function(params, onCompletion){
		return ExportLetterOfCreditRepository.prototype.customVerb('getExportLetterOfCreditDrawingById', params, onCompletion);
	};

	//For Operation 'deleteExportLetterOfCreditDrawing' with service id 'deleteExportLetterOfCreditDrawing1751'
	ExportLetterOfCreditRepository.prototype.deleteExportLetterOfCreditDrawing = function(params, onCompletion){
		return ExportLetterOfCreditRepository.prototype.customVerb('deleteExportLetterOfCreditDrawing', params, onCompletion);
	};

	//For Operation 'generateExportLetterOfCreditDrawing' with service id 'GenerateExportDrawingPdf5422'
	ExportLetterOfCreditRepository.prototype.generateExportLetterOfCreditDrawing = function(params, onCompletion){
		return ExportLetterOfCreditRepository.prototype.customVerb('generateExportLetterOfCreditDrawing', params, onCompletion);
	};

	//For Operation 'submitBeneficiaryConsent' with service id 'SubmitBeneficiaryConsent9055'
	ExportLetterOfCreditRepository.prototype.submitBeneficiaryConsent = function(params, onCompletion){
		return ExportLetterOfCreditRepository.prototype.customVerb('submitBeneficiaryConsent', params, onCompletion);
	};

	//For Operation 'updateDrawingByBank' with service id 'updateDrawingByBank8239'
	ExportLetterOfCreditRepository.prototype.updateDrawingByBank = function(params, onCompletion){
		return ExportLetterOfCreditRepository.prototype.customVerb('updateDrawingByBank', params, onCompletion);
	};

	//For Operation 'getExportLetterOfCredits' with service id 'GetExportLetterOfCredits2639'
	ExportLetterOfCreditRepository.prototype.getExportLetterOfCredits = function(params, onCompletion){
		return ExportLetterOfCreditRepository.prototype.customVerb('getExportLetterOfCredits', params, onCompletion);
	};

	//For Operation 'getExportLetterOfCreditsById' with service id 'GetExportLetterOfCreditsById1694'
	ExportLetterOfCreditRepository.prototype.getExportLetterOfCreditsById = function(params, onCompletion){
		return ExportLetterOfCreditRepository.prototype.customVerb('getExportLetterOfCreditsById', params, onCompletion);
	};

	//For Operation 'getExportLCAmendmentById' with service id 'GetExportLCAmendmentById3838'
	ExportLetterOfCreditRepository.prototype.getExportLCAmendmentById = function(params, onCompletion){
		return ExportLetterOfCreditRepository.prototype.customVerb('getExportLCAmendmentById', params, onCompletion);
	};

	//For Operation 'createExportLetterOfCreditDrawing' with service id 'CreateExportLCDrawing3781'
	ExportLetterOfCreditRepository.prototype.createExportLetterOfCreditDrawing = function(params, onCompletion){
		return ExportLetterOfCreditRepository.prototype.customVerb('createExportLetterOfCreditDrawing', params, onCompletion);
	};

	//For Operation 'updateExportLetterOfCreditDrawing' with service id 'updateExportLetterOfCreditDrawing4325'
	ExportLetterOfCreditRepository.prototype.updateExportLetterOfCreditDrawing = function(params, onCompletion){
		return ExportLetterOfCreditRepository.prototype.customVerb('updateExportLetterOfCreditDrawing', params, onCompletion);
	};

	//For Operation 'updateExportLCByBank' with service id 'UpdateExportLCByBank5212'
	ExportLetterOfCreditRepository.prototype.updateExportLCByBank = function(params, onCompletion){
		return ExportLetterOfCreditRepository.prototype.customVerb('updateExportLCByBank', params, onCompletion);
	};

	//For Operation 'updateExportAmendmentByBank' with service id 'updateExportAmendmentByBank4198'
	ExportLetterOfCreditRepository.prototype.updateExportAmendmentByBank = function(params, onCompletion){
		return ExportLetterOfCreditRepository.prototype.customVerb('updateExportAmendmentByBank', params, onCompletion);
	};

	//For Operation 'createExportLetterOfCredit' with service id 'createExportLetterOfCredit4688'
	ExportLetterOfCreditRepository.prototype.createExportLetterOfCredit = function(params, onCompletion){
		return ExportLetterOfCreditRepository.prototype.customVerb('createExportLetterOfCredit', params, onCompletion);
	};

	//For Operation 'generateExportLetterOfCreditAmendment' with service id 'GenerateExportLCAmendments1305'
	ExportLetterOfCreditRepository.prototype.generateExportLetterOfCreditAmendment = function(params, onCompletion){
		return ExportLetterOfCreditRepository.prototype.customVerb('generateExportLetterOfCreditAmendment', params, onCompletion);
	};

	//For Operation 'updateExportLCAmendmentByBank' with service id 'UpdateExportLCAmendmentByBank8585'
	ExportLetterOfCreditRepository.prototype.updateExportLCAmendmentByBank = function(params, onCompletion){
		return ExportLetterOfCreditRepository.prototype.customVerb('updateExportLCAmendmentByBank', params, onCompletion);
	};

	//For Operation 'getExportLetterOfCreditDrawings' with service id 'getExportLetterOfCreditDrawings4379'
	ExportLetterOfCreditRepository.prototype.getExportLetterOfCreditDrawings = function(params, onCompletion){
		return ExportLetterOfCreditRepository.prototype.customVerb('getExportLetterOfCreditDrawings', params, onCompletion);
	};

	//For Operation 'updateExportLCAmendment' with service id 'UpdateExportLCAmendment7339'
	ExportLetterOfCreditRepository.prototype.updateExportLCAmendment = function(params, onCompletion){
		return ExportLetterOfCreditRepository.prototype.customVerb('updateExportLCAmendment', params, onCompletion);
	};

	//For Operation 'createExportLetterOfCreditAmendment' with service id 'CreateExportLCAmendment6869'
	ExportLetterOfCreditRepository.prototype.createExportLetterOfCreditAmendment = function(params, onCompletion){
		return ExportLetterOfCreditRepository.prototype.customVerb('createExportLetterOfCreditAmendment', params, onCompletion);
	};

	//For Operation 'getExportLCAmmendments' with service id 'getExportLCAmendments3269'
	ExportLetterOfCreditRepository.prototype.getExportLCAmmendments = function(params, onCompletion){
		return ExportLetterOfCreditRepository.prototype.customVerb('getExportLCAmmendments', params, onCompletion);
	};

	return ExportLetterOfCreditRepository;
})