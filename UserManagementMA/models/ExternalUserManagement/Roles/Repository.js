define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function RolesRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	RolesRepository.prototype = Object.create(BaseRepository.prototype);
	RolesRepository.prototype.constructor = RolesRepository;

	//For Operation 'updateRole' with service id 'updateCustomRole4838'
	RolesRepository.prototype.updateRole = function(params, onCompletion){
		return RolesRepository.prototype.customVerb('updateRole', params, onCompletion);
	};

	//For Operation 'getRolesFromContract' with service id 'GetCompanyLevelCustomRoles5912'
	RolesRepository.prototype.getRolesFromContract = function(params, onCompletion){
		return RolesRepository.prototype.customVerb('getRolesFromContract', params, onCompletion);
	};

	//For Operation 'createRole' with service id 'CreateCustomRole5620'
	RolesRepository.prototype.createRole = function(params, onCompletion){
		return RolesRepository.prototype.customVerb('createRole', params, onCompletion);
	};

	//For Operation 'getRoleDetails' with service id 'getCustomRoleDetails8368'
	RolesRepository.prototype.getRoleDetails = function(params, onCompletion){
		return RolesRepository.prototype.customVerb('getRoleDetails', params, onCompletion);
	};

	//For Operation 'verifyRoleName' with service id 'verifyCustomRoleName5601'
	RolesRepository.prototype.verifyRoleName = function(params, onCompletion){
		return RolesRepository.prototype.customVerb('verifyRoleName', params, onCompletion);
	};

	return RolesRepository;
})