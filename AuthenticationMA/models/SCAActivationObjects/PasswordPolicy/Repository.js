define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function PasswordPolicyRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	PasswordPolicyRepository.prototype = Object.create(BaseRepository.prototype);
	PasswordPolicyRepository.prototype.constructor = PasswordPolicyRepository;

	//For Operation 'fetch' with service id 'getPasswordPolicy4599'
	PasswordPolicyRepository.prototype.fetch = function(params, onCompletion){
		return PasswordPolicyRepository.prototype.customVerb('fetch', params, onCompletion);
	};

	return PasswordPolicyRepository;
})