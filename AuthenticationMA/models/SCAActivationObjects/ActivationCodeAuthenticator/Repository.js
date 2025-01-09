define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ActivationCodeAuthenticatorRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ActivationCodeAuthenticatorRepository.prototype = Object.create(BaseRepository.prototype);
	ActivationCodeAuthenticatorRepository.prototype.constructor = ActivationCodeAuthenticatorRepository;

	//For Operation 'createPassword' with service id 'createPassword8403'
	ActivationCodeAuthenticatorRepository.prototype.createPassword = function(params, onCompletion){
		return ActivationCodeAuthenticatorRepository.prototype.customVerb('createPassword', params, onCompletion);
	};

	//For Operation 'resetPassword' with service id 'changePassword5892'
	ActivationCodeAuthenticatorRepository.prototype.resetPassword = function(params, onCompletion){
		return ActivationCodeAuthenticatorRepository.prototype.customVerb('resetPassword', params, onCompletion);
	};

	//For Operation 'login' with service id 'login2774'
	ActivationCodeAuthenticatorRepository.prototype.login = function(params, onCompletion){
		return ActivationCodeAuthenticatorRepository.prototype.customVerb('login', params, onCompletion);
	};

	//For Operation 'createDevice' with service id 'createDevice7355'
	ActivationCodeAuthenticatorRepository.prototype.createDevice = function(params, onCompletion){
		return ActivationCodeAuthenticatorRepository.prototype.customVerb('createDevice', params, onCompletion);
	};

	//For Operation 'getDevice' with service id 'getDevice6362'
	ActivationCodeAuthenticatorRepository.prototype.getDevice = function(params, onCompletion){
		return ActivationCodeAuthenticatorRepository.prototype.customVerb('getDevice', params, onCompletion);
	};

	return ActivationCodeAuthenticatorRepository;
})