define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function Users_2Repository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	Users_2Repository.prototype = Object.create(BaseRepository.prototype);
	Users_2Repository.prototype.constructor = Users_2Repository;

	//For Operation 'requestLoginMFAOTP' with service id 'RequestLoginMFAOTP1676'
	Users_2Repository.prototype.requestLoginMFAOTP = function(params, onCompletion){
		return Users_2Repository.prototype.customVerb('requestLoginMFAOTP', params, onCompletion);
	};

	//For Operation 'verifyLoginMFASecurityQuestions' with service id 'DBX_verifyCustomerSecurityQuestions9295'
	Users_2Repository.prototype.verifyLoginMFASecurityQuestions = function(params, onCompletion){
		return Users_2Repository.prototype.customVerb('verifyLoginMFASecurityQuestions', params, onCompletion);
	};

	//For Operation 'resetUserPassword' with service id 'resetDbxUserPassword2912'
	Users_2Repository.prototype.resetUserPassword = function(params, onCompletion){
		return Users_2Repository.prototype.customVerb('resetUserPassword', params, onCompletion);
	};

	//For Operation 'verifyOTPPreLogin' with service id 'VerifyOTPPreLogin6602'
	Users_2Repository.prototype.verifyOTPPreLogin = function(params, onCompletion){
		return Users_2Repository.prototype.customVerb('verifyOTPPreLogin', params, onCompletion);
	};

	//For Operation 'verifyUser' with service id 'VerifyUserAndSendMail8862'
	Users_2Repository.prototype.verifyUser = function(params, onCompletion){
		return Users_2Repository.prototype.customVerb('verifyUser', params, onCompletion);
	};

	//For Operation 'getPasswordLockoutSettings' with service id 'getPasswordLockoutSettings9051'
	Users_2Repository.prototype.getPasswordLockoutSettings = function(params, onCompletion){
		return Users_2Repository.prototype.customVerb('getPasswordLockoutSettings', params, onCompletion);
	};

	//For Operation 'verifyLoginMFAOTP' with service id 'VerifyLoginMFAOTP1345'
	Users_2Repository.prototype.verifyLoginMFAOTP = function(params, onCompletion){
		return Users_2Repository.prototype.customVerb('verifyLoginMFAOTP', params, onCompletion);
	};

	//For Operation 'getPasswordRulesAndPolicy' with service id 'getPasswordRulesAndPolicy6538'
	Users_2Repository.prototype.getPasswordRulesAndPolicy = function(params, onCompletion){
		return Users_2Repository.prototype.customVerb('getPasswordRulesAndPolicy', params, onCompletion);
	};

	//For Operation 'requestResetPasswordOTP' with service id 'RequestOTPPreLogin5436'
	Users_2Repository.prototype.requestResetPasswordOTP = function(params, onCompletion){
		return Users_2Repository.prototype.customVerb('requestResetPasswordOTP', params, onCompletion);
	};

	return Users_2Repository;
})