define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function DocumentChecklistRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	DocumentChecklistRepository.prototype = Object.create(BaseRepository.prototype);
	DocumentChecklistRepository.prototype.constructor = DocumentChecklistRepository;

	//For Operation 'getRequiredDocuments' with service id 'GetRequiredDocuments5042'
	DocumentChecklistRepository.prototype.getRequiredDocuments = function(params, onCompletion){
		return DocumentChecklistRepository.prototype.customVerb('getRequiredDocuments', params, onCompletion);
	};

	//For Operation 'uploadMultipleDocumentForChecklist' with service id 'UploadMultipleDocumentForChecklist9295'
	DocumentChecklistRepository.prototype.uploadMultipleDocumentForChecklist = function(params, onCompletion){
		return DocumentChecklistRepository.prototype.customVerb('uploadMultipleDocumentForChecklist', params, onCompletion);
	};

	//For Operation 'getDocumentChecklist' with service id 'GetDocumentChecklistOperation3691'
	DocumentChecklistRepository.prototype.getDocumentChecklist = function(params, onCompletion){
		return DocumentChecklistRepository.prototype.customVerb('getDocumentChecklist', params, onCompletion);
	};

	//For Operation 'downloadDocument' with service id 'DownloadDocumentOperation4743'
	DocumentChecklistRepository.prototype.downloadDocument = function(params, onCompletion){
		return DocumentChecklistRepository.prototype.customVerb('downloadDocument', params, onCompletion);
	};

	//For Operation 'deleteEvidence' with service id 'DeleteEvidenceOperation9690'
	DocumentChecklistRepository.prototype.deleteEvidence = function(params, onCompletion){
		return DocumentChecklistRepository.prototype.customVerb('deleteEvidence', params, onCompletion);
	};

	//For Operation 'deleteDocument' with service id 'DeleteDocumentOperation9410'
	DocumentChecklistRepository.prototype.deleteDocument = function(params, onCompletion){
		return DocumentChecklistRepository.prototype.customVerb('deleteDocument', params, onCompletion);
	};

	//For Operation 'getDocumentsData' with service id 'GetDocumentsDataOperation6807'
	DocumentChecklistRepository.prototype.getDocumentsData = function(params, onCompletion){
		return DocumentChecklistRepository.prototype.customVerb('getDocumentsData', params, onCompletion);
	};

	//For Operation 'submitEvidence' with service id 'SubmitEvidenceOperation6560'
	DocumentChecklistRepository.prototype.submitEvidence = function(params, onCompletion){
		return DocumentChecklistRepository.prototype.customVerb('submitEvidence', params, onCompletion);
	};

	//For Operation 'uploadDocument' with service id 'UploadDocumentForChecklist1342'
	DocumentChecklistRepository.prototype.uploadDocument = function(params, onCompletion){
		return DocumentChecklistRepository.prototype.customVerb('uploadDocument', params, onCompletion);
	};

	//For Operation 'useEvidence' with service id 'UseEvidenceOperation3423'
	DocumentChecklistRepository.prototype.useEvidence = function(params, onCompletion){
		return DocumentChecklistRepository.prototype.customVerb('useEvidence', params, onCompletion);
	};

	//For Operation 'uploadMultipleDocuments' with service id 'UploadDocumentsOperation6055'
	DocumentChecklistRepository.prototype.uploadMultipleDocuments = function(params, onCompletion){
		return DocumentChecklistRepository.prototype.customVerb('uploadMultipleDocuments', params, onCompletion);
	};

	return DocumentChecklistRepository;
})