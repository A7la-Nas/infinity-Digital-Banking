define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function UsersRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	UsersRepository.prototype = Object.create(BaseRepository.prototype);
	UsersRepository.prototype.constructor = UsersRepository;

	//For Operation 'getUserProfileImage' with service id 'GetUserProfileImage9129'
	UsersRepository.prototype.getUserProfileImage = function(params, onCompletion){
		return UsersRepository.prototype.customVerb('getUserProfileImage', params, onCompletion);
	};

	//For Operation 'verifyPin' with service id 'verifyPin2016'
	UsersRepository.prototype.verifyPin = function(params, onCompletion){
		return UsersRepository.prototype.customVerb('verifyPin', params, onCompletion);
	};

	return UsersRepository;
})