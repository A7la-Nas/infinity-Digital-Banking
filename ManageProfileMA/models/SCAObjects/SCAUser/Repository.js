define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function SCAUserRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	SCAUserRepository.prototype = Object.create(BaseRepository.prototype);
	SCAUserRepository.prototype.constructor = SCAUserRepository;

	//For Operation 'validateTransaction' with service id 'validateTransaction4224'
	SCAUserRepository.prototype.validateTransaction = function(params, onCompletion){
		return SCAUserRepository.prototype.customVerb('validateTransaction', params, onCompletion);
	};

	//For Operation 'updateMyStatus' with service id 'scaUpdateMyStatus3694'
	SCAUserRepository.prototype.updateMyStatus = function(params, onCompletion){
		return SCAUserRepository.prototype.customVerb('updateMyStatus', params, onCompletion);
	};

	//For Operation 'checkPasswordAuthenticatorForUser' with service id 'checkPasswordAuthenticatorForUser6604'
	SCAUserRepository.prototype.checkPasswordAuthenticatorForUser = function(params, onCompletion){
		return SCAUserRepository.prototype.customVerb('checkPasswordAuthenticatorForUser', params, onCompletion);
	};

	//For Operation 'updateMyProfileDetails' with service id 'updateMyProfileDetails1242'
	SCAUserRepository.prototype.updateMyProfileDetails = function(params, onCompletion){
		return SCAUserRepository.prototype.customVerb('updateMyProfileDetails', params, onCompletion);
	};

	//For Operation 'changeOLBPassword' with service id 'changeOLBPassword4233'
	SCAUserRepository.prototype.changeOLBPassword = function(params, onCompletion){
		return SCAUserRepository.prototype.customVerb('changeOLBPassword', params, onCompletion);
	};

	//For Operation 'createOLBPassword' with service id 'createOLBPasswordPostActivation2733'
	SCAUserRepository.prototype.createOLBPassword = function(params, onCompletion){
		return SCAUserRepository.prototype.customVerb('createOLBPassword', params, onCompletion);
	};

	return SCAUserRepository;
})