define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function PermissionRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	PermissionRepository.prototype = Object.create(BaseRepository.prototype);
	PermissionRepository.prototype.constructor = PermissionRepository;

	//For Operation 'verifyAccountPermissions' with service id 'verifyAccountPermissions8457'
	PermissionRepository.prototype.verifyAccountPermissions = function(params, onCompletion){
		return PermissionRepository.prototype.customVerb('verifyAccountPermissions', params, onCompletion);
	};

	return PermissionRepository;
})