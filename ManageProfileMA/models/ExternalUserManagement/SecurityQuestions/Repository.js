define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function SecurityQuestionsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	SecurityQuestionsRepository.prototype = Object.create(BaseRepository.prototype);
	SecurityQuestionsRepository.prototype.constructor = SecurityQuestionsRepository;

	//For Operation 'updateSecurityQuestions' with service id 'createCustomerSecurityQuestions2925'
	SecurityQuestionsRepository.prototype.updateSecurityQuestions = function(params, onCompletion){
		return SecurityQuestionsRepository.prototype.customVerb('updateSecurityQuestions', params, onCompletion);
	};

	//For Operation 'getSecurityQuestions' with service id 'getSecurityQuestions4781'
	SecurityQuestionsRepository.prototype.getSecurityQuestions = function(params, onCompletion){
		return SecurityQuestionsRepository.prototype.customVerb('getSecurityQuestions', params, onCompletion);
	};

	return SecurityQuestionsRepository;
})