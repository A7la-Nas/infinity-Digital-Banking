define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function SignatoryGroupRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	SignatoryGroupRepository.prototype = Object.create(BaseRepository.prototype);
	SignatoryGroupRepository.prototype.constructor = SignatoryGroupRepository;

	//For Operation 'deleteSignatoryGroup' with service id 'deleteSignatoryGroup6648'
	SignatoryGroupRepository.prototype.deleteSignatoryGroup = function(params, onCompletion){
		return SignatoryGroupRepository.prototype.customVerb('deleteSignatoryGroup', params, onCompletion);
	};

	//For Operation 'updateSignatoryGroup' with service id 'updateSignatoryGroup8670'
	SignatoryGroupRepository.prototype.updateSignatoryGroup = function(params, onCompletion){
		return SignatoryGroupRepository.prototype.customVerb('updateSignatoryGroup', params, onCompletion);
	};

	//For Operation 'fetchSignatoryGroupDetails' with service id 'fetchSignatoryGroupDetails6713'
	SignatoryGroupRepository.prototype.fetchSignatoryGroupDetails = function(params, onCompletion){
		return SignatoryGroupRepository.prototype.customVerb('fetchSignatoryGroupDetails', params, onCompletion);
	};

	//For Operation 'createSignatoryGroup' with service id 'createSignatoryGroup5667'
	SignatoryGroupRepository.prototype.createSignatoryGroup = function(params, onCompletion){
		return SignatoryGroupRepository.prototype.customVerb('createSignatoryGroup', params, onCompletion);
	};

	//For Operation 'fetchEligibleSignatoryUsers' with service id 'fetchEligibleSignatoryUsers8249'
	SignatoryGroupRepository.prototype.fetchEligibleSignatoryUsers = function(params, onCompletion){
		return SignatoryGroupRepository.prototype.customVerb('fetchEligibleSignatoryUsers', params, onCompletion);
	};

	//For Operation 'fetchSignatoryGroupsbyCustomerIds' with service id 'fetchSignatoryGroupsbyCustomerIds1646'
	SignatoryGroupRepository.prototype.fetchSignatoryGroupsbyCustomerIds = function(params, onCompletion){
		return SignatoryGroupRepository.prototype.customVerb('fetchSignatoryGroupsbyCustomerIds', params, onCompletion);
	};

	//For Operation 'isSignatoryGroupEligibleForDelete' with service id 'isSignatoryGroupEligibleForDelete2538'
	SignatoryGroupRepository.prototype.isSignatoryGroupEligibleForDelete = function(params, onCompletion){
		return SignatoryGroupRepository.prototype.customVerb('isSignatoryGroupEligibleForDelete', params, onCompletion);
	};

	//For Operation 'isSignatoryGroupNameAvailable' with service id 'isSignatoryGroupNameAvailable6167'
	SignatoryGroupRepository.prototype.isSignatoryGroupNameAvailable = function(params, onCompletion){
		return SignatoryGroupRepository.prototype.customVerb('isSignatoryGroupNameAvailable', params, onCompletion);
	};

	//For Operation 'fetchAllSignatoryGroups' with service id 'fetchAllSignatoryGroups5118'
	SignatoryGroupRepository.prototype.fetchAllSignatoryGroups = function(params, onCompletion){
		return SignatoryGroupRepository.prototype.customVerb('fetchAllSignatoryGroups', params, onCompletion);
	};

	//For Operation 'fetchSignatoryGroups' with service id 'fetchSignatoryGroups7038'
	SignatoryGroupRepository.prototype.fetchSignatoryGroups = function(params, onCompletion){
		return SignatoryGroupRepository.prototype.customVerb('fetchSignatoryGroups', params, onCompletion);
	};

	return SignatoryGroupRepository;
})