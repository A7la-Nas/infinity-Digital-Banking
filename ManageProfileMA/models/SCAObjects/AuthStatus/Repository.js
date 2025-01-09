define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function AuthStatusRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	AuthStatusRepository.prototype = Object.create(BaseRepository.prototype);
	AuthStatusRepository.prototype.constructor = AuthStatusRepository;

	//For Operation 'fetch' with service id 'getCIBAApprovalStatus9850'
	AuthStatusRepository.prototype.fetch = function(params, onCompletion){
		return AuthStatusRepository.prototype.customVerb('fetch', params, onCompletion);
	};

	return AuthStatusRepository;
})