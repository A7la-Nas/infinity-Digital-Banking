define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function LCDocumentsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	LCDocumentsRepository.prototype = Object.create(BaseRepository.prototype);
	LCDocumentsRepository.prototype.constructor = LCDocumentsRepository;

	//For Operation 'retrieveDocuments' with service id 'RetrieveDrawingDocuments3732'
	LCDocumentsRepository.prototype.retrieveDocuments = function(params, onCompletion){
		return LCDocumentsRepository.prototype.customVerb('retrieveDocuments', params, onCompletion);
	};

	//For Operation 'downloadDocument' with service id 'downloadDocument9618'
	LCDocumentsRepository.prototype.downloadDocument = function(params, onCompletion){
		return LCDocumentsRepository.prototype.customVerb('downloadDocument', params, onCompletion);
	};

	//For Operation 'deleteDocument' with service id 'deleteDrawingDocument9860'
	LCDocumentsRepository.prototype.deleteDocument = function(params, onCompletion){
		return LCDocumentsRepository.prototype.customVerb('deleteDocument', params, onCompletion);
	};

	//For Operation 'uploadDocument' with service id 'DrawingUploadDocuments4485'
	LCDocumentsRepository.prototype.uploadDocument = function(params, onCompletion){
		return LCDocumentsRepository.prototype.customVerb('uploadDocument', params, onCompletion);
	};

	return LCDocumentsRepository;
})