define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function TradeDocumentsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	TradeDocumentsRepository.prototype = Object.create(BaseRepository.prototype);
	TradeDocumentsRepository.prototype.constructor = TradeDocumentsRepository;

	//For Operation 'downloadDocument' with service id 'DownloadDocument9479'
	TradeDocumentsRepository.prototype.downloadDocument = function(params, onCompletion){
		return TradeDocumentsRepository.prototype.customVerb('downloadDocument', params, onCompletion);
	};

	//For Operation 'deleteDocument' with service id 'DeleteDocument2086'
	TradeDocumentsRepository.prototype.deleteDocument = function(params, onCompletion){
		return TradeDocumentsRepository.prototype.customVerb('deleteDocument', params, onCompletion);
	};

	//For Operation 'uploadDocument' with service id 'UploadDocuments3920'
	TradeDocumentsRepository.prototype.uploadDocument = function(params, onCompletion){
		return TradeDocumentsRepository.prototype.customVerb('uploadDocument', params, onCompletion);
	};

	return TradeDocumentsRepository;
})