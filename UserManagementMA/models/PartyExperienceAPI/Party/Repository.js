define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function PartyRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	PartyRepository.prototype = Object.create(BaseRepository.prototype);
	PartyRepository.prototype.constructor = PartyRepository;

	//For Operation 'createPartyIdentifier' with service id 'CreatePartyIdentifier3339'
	PartyRepository.prototype.createPartyIdentifier = function(params, onCompletion){
		return PartyRepository.prototype.customVerb('createPartyIdentifier', params, onCompletion);
	};

	//For Operation 'createParty' with service id 'PartyCreateOperation5101'
	PartyRepository.prototype.createParty = function(params, onCompletion){
		return PartyRepository.prototype.customVerb('createParty', params, onCompletion);
	};

	//For Operation 'getPartyRelations' with service id 'getPartyRelationsOperation4400'
	PartyRepository.prototype.getPartyRelations = function(params, onCompletion){
		return PartyRepository.prototype.customVerb('getPartyRelations', params, onCompletion);
	};

	//For Operation 'createPartyRelations' with service id 'CreatePartyRelationsOperation3983'
	PartyRepository.prototype.createPartyRelations = function(params, onCompletion){
		return PartyRepository.prototype.customVerb('createPartyRelations', params, onCompletion);
	};

	//For Operation 'updatePartyRelations' with service id 'UpdatePartyRelationsOperation3393'
	PartyRepository.prototype.updatePartyRelations = function(params, onCompletion){
		return PartyRepository.prototype.customVerb('updatePartyRelations', params, onCompletion);
	};

	//For Operation 'getParty' with service id 'PartyGetOperation5897'
	PartyRepository.prototype.getParty = function(params, onCompletion){
		return PartyRepository.prototype.customVerb('getParty', params, onCompletion);
	};

	//For Operation 'updateParty' with service id 'PartyUpdateOperation9902'
	PartyRepository.prototype.updateParty = function(params, onCompletion){
		return PartyRepository.prototype.customVerb('updateParty', params, onCompletion);
	};

	return PartyRepository;
})