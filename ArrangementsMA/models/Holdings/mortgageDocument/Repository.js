define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function mortgageDocumentRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	mortgageDocumentRepository.prototype = Object.create(BaseRepository.prototype);
	mortgageDocumentRepository.prototype.constructor = mortgageDocumentRepository;

	//For Operation 'downloadDocument' with service id 'downloadDocument9036'
	mortgageDocumentRepository.prototype.downloadDocument = function(params, onCompletion){
		return mortgageDocumentRepository.prototype.customVerb('downloadDocument', params, onCompletion);
	};

	//For Operation 'getDocuments' with service id 'searchDocument4820'
	mortgageDocumentRepository.prototype.getDocuments = function(params, onCompletion){
		return mortgageDocumentRepository.prototype.customVerb('getDocuments', params, onCompletion);
	};

	return mortgageDocumentRepository;
})