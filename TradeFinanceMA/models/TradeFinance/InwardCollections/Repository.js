define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function InwardCollectionsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	InwardCollectionsRepository.prototype = Object.create(BaseRepository.prototype);
	InwardCollectionsRepository.prototype.constructor = InwardCollectionsRepository;

	//For Operation 'updateInwardCollectionAmendment' with service id 'updateInwardCollectionAmendment1891'
	InwardCollectionsRepository.prototype.updateInwardCollectionAmendment = function(params, onCompletion){
		return InwardCollectionsRepository.prototype.customVerb('updateInwardCollectionAmendment', params, onCompletion);
	};

	//For Operation 'updateAmendmentByBank' with service id 'UpdateInwardAmendmentByBank8673'
	InwardCollectionsRepository.prototype.updateAmendmentByBank = function(params, onCompletion){
		return InwardCollectionsRepository.prototype.customVerb('updateAmendmentByBank', params, onCompletion);
	};

	//For Operation 'generateAmendmentsList' with service id 'GenerateInwardAmendmentsList1408'
	InwardCollectionsRepository.prototype.generateAmendmentsList = function(params, onCompletion){
		return InwardCollectionsRepository.prototype.customVerb('generateAmendmentsList', params, onCompletion);
	};

	//For Operation 'UpdateInwardCollection' with service id 'updateInwardCollection9297'
	InwardCollectionsRepository.prototype.UpdateInwardCollection = function(params, onCompletion){
		return InwardCollectionsRepository.prototype.customVerb('UpdateInwardCollection', params, onCompletion);
	};

	//For Operation 'createAmendment' with service id 'CreateInwardCollectionAmendment9163'
	InwardCollectionsRepository.prototype.createAmendment = function(params, onCompletion){
		return InwardCollectionsRepository.prototype.customVerb('createAmendment', params, onCompletion);
	};

	//For Operation 'getCollections' with service id 'GetInwardCollections7162'
	InwardCollectionsRepository.prototype.getCollections = function(params, onCompletion){
		return InwardCollectionsRepository.prototype.customVerb('getCollections', params, onCompletion);
	};

	//For Operation 'generateInwardCollectionsList' with service id 'GenerateInwardCollectionsList1311'
	InwardCollectionsRepository.prototype.generateInwardCollectionsList = function(params, onCompletion){
		return InwardCollectionsRepository.prototype.customVerb('generateInwardCollectionsList', params, onCompletion);
	};

	//For Operation 'generateAmendmentReport' with service id 'GenerateInwardAmendmentReport9252'
	InwardCollectionsRepository.prototype.generateAmendmentReport = function(params, onCompletion){
		return InwardCollectionsRepository.prototype.customVerb('generateAmendmentReport', params, onCompletion);
	};

	//For Operation 'generateInwardCollectionReport' with service id 'GenerateInwardCollection7653'
	InwardCollectionsRepository.prototype.generateInwardCollectionReport = function(params, onCompletion){
		return InwardCollectionsRepository.prototype.customVerb('generateInwardCollectionReport', params, onCompletion);
	};

	//For Operation 'GetInwardCollectionsAmendmentById' with service id 'getInwardCollectionsAmendmentById4958'
	InwardCollectionsRepository.prototype.GetInwardCollectionsAmendmentById = function(params, onCompletion){
		return InwardCollectionsRepository.prototype.customVerb('GetInwardCollectionsAmendmentById', params, onCompletion);
	};

	//For Operation 'updateInwardCollectionByBank' with service id 'updateInwardCollectionByBank6965'
	InwardCollectionsRepository.prototype.updateInwardCollectionByBank = function(params, onCompletion){
		return InwardCollectionsRepository.prototype.customVerb('updateInwardCollectionByBank', params, onCompletion);
	};

	//For Operation 'GetInwardCollectionsAmendments' with service id 'getInwardCollectionsAmendments6676'
	InwardCollectionsRepository.prototype.GetInwardCollectionsAmendments = function(params, onCompletion){
		return InwardCollectionsRepository.prototype.customVerb('GetInwardCollectionsAmendments', params, onCompletion);
	};

	//For Operation 'getCollectionById' with service id 'GetInwardCollectionById4095'
	InwardCollectionsRepository.prototype.getCollectionById = function(params, onCompletion){
		return InwardCollectionsRepository.prototype.customVerb('getCollectionById', params, onCompletion);
	};

	//For Operation 'createCollection' with service id 'CreateInwardCollection4565'
	InwardCollectionsRepository.prototype.createCollection = function(params, onCompletion){
		return InwardCollectionsRepository.prototype.customVerb('createCollection', params, onCompletion);
	};

	return InwardCollectionsRepository;
})