define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function OutwardCollectionsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	OutwardCollectionsRepository.prototype = Object.create(BaseRepository.prototype);
	OutwardCollectionsRepository.prototype.constructor = OutwardCollectionsRepository;

	//For Operation 'updateAmendment' with service id 'UpdateOutwardAmendment1587'
	OutwardCollectionsRepository.prototype.updateAmendment = function(params, onCompletion){
		return OutwardCollectionsRepository.prototype.customVerb('updateAmendment', params, onCompletion);
	};

	//For Operation 'updateAmendmentByBank' with service id 'UpdateOutwardAmendmentByBank8345'
	OutwardCollectionsRepository.prototype.updateAmendmentByBank = function(params, onCompletion){
		return OutwardCollectionsRepository.prototype.customVerb('updateAmendmentByBank', params, onCompletion);
	};

	//For Operation 'deleteCollection' with service id 'DeleteOutwardCollection9612'
	OutwardCollectionsRepository.prototype.deleteCollection = function(params, onCompletion){
		return OutwardCollectionsRepository.prototype.customVerb('deleteCollection', params, onCompletion);
	};

	//For Operation 'generateAmendmentsList' with service id 'GenerateOutwardAmendmentsList9460'
	OutwardCollectionsRepository.prototype.generateAmendmentsList = function(params, onCompletion){
		return OutwardCollectionsRepository.prototype.customVerb('generateAmendmentsList', params, onCompletion);
	};

	//For Operation 'requestCollectionStatus' with service id 'RequestCollectionStatus2976'
	OutwardCollectionsRepository.prototype.requestCollectionStatus = function(params, onCompletion){
		return OutwardCollectionsRepository.prototype.customVerb('requestCollectionStatus', params, onCompletion);
	};

	//For Operation 'createAmendment' with service id 'CreateOutwardAmendment5816'
	OutwardCollectionsRepository.prototype.createAmendment = function(params, onCompletion){
		return OutwardCollectionsRepository.prototype.customVerb('createAmendment', params, onCompletion);
	};

	//For Operation 'getCollections' with service id 'GetOutwardCollections9250'
	OutwardCollectionsRepository.prototype.getCollections = function(params, onCompletion){
		return OutwardCollectionsRepository.prototype.customVerb('getCollections', params, onCompletion);
	};

	//For Operation 'getAmendments' with service id 'GetOutwardAmendments1156'
	OutwardCollectionsRepository.prototype.getAmendments = function(params, onCompletion){
		return OutwardCollectionsRepository.prototype.customVerb('getAmendments', params, onCompletion);
	};

	//For Operation 'generateAmendmentReport' with service id 'GenerateOutwardAmendmentReport2147'
	OutwardCollectionsRepository.prototype.generateAmendmentReport = function(params, onCompletion){
		return OutwardCollectionsRepository.prototype.customVerb('generateAmendmentReport', params, onCompletion);
	};

	//For Operation 'generateCollectionReport' with service id 'GenerateOutwardCollectionReport8249'
	OutwardCollectionsRepository.prototype.generateCollectionReport = function(params, onCompletion){
		return OutwardCollectionsRepository.prototype.customVerb('generateCollectionReport', params, onCompletion);
	};

	//For Operation 'saveCollection' with service id 'SaveOutwardCollection3380'
	OutwardCollectionsRepository.prototype.saveCollection = function(params, onCompletion){
		return OutwardCollectionsRepository.prototype.customVerb('saveCollection', params, onCompletion);
	};

	//For Operation 'getAmendmentById' with service id 'GetOutwardAmendmentById4028'
	OutwardCollectionsRepository.prototype.getAmendmentById = function(params, onCompletion){
		return OutwardCollectionsRepository.prototype.customVerb('getAmendmentById', params, onCompletion);
	};

	//For Operation 'updateCollection' with service id 'UpdateOutwardCollection6447'
	OutwardCollectionsRepository.prototype.updateCollection = function(params, onCompletion){
		return OutwardCollectionsRepository.prototype.customVerb('updateCollection', params, onCompletion);
	};

	//For Operation 'updateCollectionByBank' with service id 'UpdateOutwardCollectionByBank2643'
	OutwardCollectionsRepository.prototype.updateCollectionByBank = function(params, onCompletion){
		return OutwardCollectionsRepository.prototype.customVerb('updateCollectionByBank', params, onCompletion);
	};

	//For Operation 'generateCollectionsList' with service id 'GenerateOutwardCollectionsList2914'
	OutwardCollectionsRepository.prototype.generateCollectionsList = function(params, onCompletion){
		return OutwardCollectionsRepository.prototype.customVerb('generateCollectionsList', params, onCompletion);
	};

	//For Operation 'getCollectionById' with service id 'GetOutwardCollectionById8678'
	OutwardCollectionsRepository.prototype.getCollectionById = function(params, onCompletion){
		return OutwardCollectionsRepository.prototype.customVerb('getCollectionById', params, onCompletion);
	};

	//For Operation 'createCollection' with service id 'CreateOutwardCollection8106'
	OutwardCollectionsRepository.prototype.createCollection = function(params, onCompletion){
		return OutwardCollectionsRepository.prototype.customVerb('createCollection', params, onCompletion);
	};

	return OutwardCollectionsRepository;
})