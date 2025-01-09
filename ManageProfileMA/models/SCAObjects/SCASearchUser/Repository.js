define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function SCASearchUserRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	SCASearchUserRepository.prototype = Object.create(BaseRepository.prototype);
	SCASearchUserRepository.prototype.constructor = SCASearchUserRepository;

	//For Operation 'verifyUserId' with service id 'searchUser5607'
	SCASearchUserRepository.prototype.verifyUserId = function(params, onCompletion){
		return SCASearchUserRepository.prototype.customVerb('verifyUserId', params, onCompletion);
	};

	//For Operation 'getPasswordAuthenticator' with service id 'getPasswordAuthenticator7060'
	SCASearchUserRepository.prototype.getPasswordAuthenticator = function(params, onCompletion){
		return SCASearchUserRepository.prototype.customVerb('getPasswordAuthenticator', params, onCompletion);
	};

	return SCASearchUserRepository;
})