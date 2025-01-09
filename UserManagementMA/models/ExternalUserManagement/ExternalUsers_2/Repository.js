define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ExternalUsers_2Repository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ExternalUsers_2Repository.prototype = Object.create(BaseRepository.prototype);
	ExternalUsers_2Repository.prototype.constructor = ExternalUsers_2Repository;

	//For Operation 'verifyDbxUserName' with service id 'verifyDbxUserName9757'
	ExternalUsers_2Repository.prototype.verifyDbxUserName = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('verifyDbxUserName', params, onCompletion);
	};

	//For Operation 'getUserNameAndPasswordRulesAndPolicies' with service id 'getUserNameAndPasswordRulesAndPolicies9819'
	ExternalUsers_2Repository.prototype.getUserNameAndPasswordRulesAndPolicies = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('getUserNameAndPasswordRulesAndPolicies', params, onCompletion);
	};

	//For Operation 'getCustomerTypes' with service id 'getCustomerTypes3510'
	ExternalUsers_2Repository.prototype.getCustomerTypes = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('getCustomerTypes', params, onCompletion);
	};

	//For Operation 'getPasswordPolicy' with service id 'getPasswordPolicy1010'
	ExternalUsers_2Repository.prototype.getPasswordPolicy = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('getPasswordPolicy', params, onCompletion);
	};

	//For Operation 'getCustomerCommunication' with service id 'getCustomerCommunication7155'
	ExternalUsers_2Repository.prototype.getCustomerCommunication = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('getCustomerCommunication', params, onCompletion);
	};

	//For Operation 'getUserNameAndPasswordPolicies' with service id 'getUserNameAndPasswordPolicies2751'
	ExternalUsers_2Repository.prototype.getUserNameAndPasswordPolicies = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('getUserNameAndPasswordPolicies', params, onCompletion);
	};

	//For Operation 'createTaxDetails' with service id 'CreateTaxOperation9137'
	ExternalUsers_2Repository.prototype.createTaxDetails = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('createTaxDetails', params, onCompletion);
	};

	//For Operation 'updateTaxDetails' with service id 'UpdateTaxOperation8244'
	ExternalUsers_2Repository.prototype.updateTaxDetails = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('updateTaxDetails', params, onCompletion);
	};

	//For Operation 'requestUpdateSecurityQuestionsOTP' with service id 'RequestOTPPreLogin1111'
	ExternalUsers_2Repository.prototype.requestUpdateSecurityQuestionsOTP = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('requestUpdateSecurityQuestionsOTP', params, onCompletion);
	};

	//For Operation 'GetDueDiligenceDetails' with service id 'GetDueDiligenceOperation3137'
	ExternalUsers_2Repository.prototype.GetDueDiligenceDetails = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('GetDueDiligenceDetails', params, onCompletion);
	};

	//For Operation 'updateDBXUserName' with service id 'updateDBXUserName8059'
	ExternalUsers_2Repository.prototype.updateDBXUserName = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('updateDBXUserName', params, onCompletion);
	};

	//For Operation 'updateUserStatus' with service id 'UpdateDBXUserStatus7858'
	ExternalUsers_2Repository.prototype.updateUserStatus = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('updateUserStatus', params, onCompletion);
	};

	//For Operation 'dbxRequestOTP' with service id 'dbxrequestOTP9356'
	ExternalUsers_2Repository.prototype.dbxRequestOTP = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('dbxRequestOTP', params, onCompletion);
	};

	//For Operation 'getGroups' with service id 'getGroups6746'
	ExternalUsers_2Repository.prototype.getGroups = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('getGroups', params, onCompletion);
	};

	//For Operation 'getUserNameAndPasswordRules' with service id 'getUsernameAndPasswordRules2133'
	ExternalUsers_2Repository.prototype.getUserNameAndPasswordRules = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('getUserNameAndPasswordRules', params, onCompletion);
	};

	//For Operation 'UpdatePasswordForActivationFlow' with service id 'UpdatePasswordForActivationFlowOperation3204'
	ExternalUsers_2Repository.prototype.UpdatePasswordForActivationFlow = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('UpdatePasswordForActivationFlow', params, onCompletion);
	};

	//For Operation 'createGroup' with service id 'createGroup8217'
	ExternalUsers_2Repository.prototype.createGroup = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('createGroup', params, onCompletion);
	};

	//For Operation 'regenerateActivationCode' with service id 'regenerateActivationCode8772'
	ExternalUsers_2Repository.prototype.regenerateActivationCode = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('regenerateActivationCode', params, onCompletion);
	};

	//For Operation 'UpdateEmploymentDetails' with service id 'UpdateEmploymentOperation7523'
	ExternalUsers_2Repository.prototype.UpdateEmploymentDetails = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('UpdateEmploymentDetails', params, onCompletion);
	};

	//For Operation 'getUserNamePolicy' with service id 'getUsernamePolicy7844'
	ExternalUsers_2Repository.prototype.getUserNamePolicy = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('getUserNamePolicy', params, onCompletion);
	};

	//For Operation 'resetUserPasswordFromEmail' with service id 'ResetUserPasswordFromEmail1681'
	ExternalUsers_2Repository.prototype.resetUserPasswordFromEmail = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('resetUserPasswordFromEmail', params, onCompletion);
	};

	//For Operation 'requestPreLoginOTP' with service id 'RequestOTPPreLogin4998'
	ExternalUsers_2Repository.prototype.requestPreLoginOTP = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('requestPreLoginOTP', params, onCompletion);
	};

	//For Operation 'getUserNameRules' with service id 'getUserNameRules4796'
	ExternalUsers_2Repository.prototype.getUserNameRules = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('getUserNameRules', params, onCompletion);
	};

	//For Operation 'getDbxUserStatus' with service id 'GetDBXUserStatus1869'
	ExternalUsers_2Repository.prototype.getDbxUserStatus = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('getDbxUserStatus', params, onCompletion);
	};

	//For Operation 'updateUserPassword' with service id 'updateDBXUserPassword9683'
	ExternalUsers_2Repository.prototype.updateUserPassword = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('updateUserPassword', params, onCompletion);
	};

	//For Operation 'verifyMFAOTP' with service id 'verifyMFAOTP1187'
	ExternalUsers_2Repository.prototype.verifyMFAOTP = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('verifyMFAOTP', params, onCompletion);
	};

	//For Operation 'fetchAuthorizedSignatories' with service id 'SearchAuthorizedSignatoriesByMembership8662'
	ExternalUsers_2Repository.prototype.fetchAuthorizedSignatories = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('fetchAuthorizedSignatories', params, onCompletion);
	};

	//For Operation 'getEAgreementPdfDownloaded' with service id 'GetEAgreementPdfDownloaded1446'
	ExternalUsers_2Repository.prototype.getEAgreementPdfDownloaded = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('getEAgreementPdfDownloaded', params, onCompletion);
	};

	//For Operation 'getAddressTypes' with service id 'getAddressTypesOperation3937'
	ExternalUsers_2Repository.prototype.getAddressTypes = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('getAddressTypes', params, onCompletion);
	};

	//For Operation 'verifyOTPPreLoginEnroll' with service id 'VerifyOTPPreLoginEnroll5460'
	ExternalUsers_2Repository.prototype.verifyOTPPreLoginEnroll = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('verifyOTPPreLoginEnroll', params, onCompletion);
	};

	//For Operation 'IsEmailLinkActive' with service id 'IsEmailLinkActive2056'
	ExternalUsers_2Repository.prototype.IsEmailLinkActive = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('IsEmailLinkActive', params, onCompletion);
	};

	//For Operation 'requestOTPRegisterMB' with service id 'RequestPreLoginOTPMB6988'
	ExternalUsers_2Repository.prototype.requestOTPRegisterMB = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('requestOTPRegisterMB', params, onCompletion);
	};

	//For Operation 'verifyOTPPreLoginMB' with service id 'VerifyPreLoginOTPMB2161'
	ExternalUsers_2Repository.prototype.verifyOTPPreLoginMB = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('verifyOTPPreLoginMB', params, onCompletion);
	};

	//For Operation 'IsSharedTokenValid' with service id 'IsSharedTokenValid6415'
	ExternalUsers_2Repository.prototype.IsSharedTokenValid = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('IsSharedTokenValid', params, onCompletion);
	};

	//For Operation 'ResendActivationLink' with service id 'ResendOrgEmployeeActivationLink3557'
	ExternalUsers_2Repository.prototype.ResendActivationLink = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('ResendActivationLink', params, onCompletion);
	};

	//For Operation 'getCustomerDetailsInPartyAndT24' with service id 'getCustomerDetailsInPartyAndT243435'
	ExternalUsers_2Repository.prototype.getCustomerDetailsInPartyAndT24 = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('getCustomerDetailsInPartyAndT24', params, onCompletion);
	};

	//For Operation 'updateUserProfileImage' with service id 'UpdateUserProfileImage6855'
	ExternalUsers_2Repository.prototype.updateUserProfileImage = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('updateUserProfileImage', params, onCompletion);
	};

	//For Operation 'getAccountActionCustomerApproverList' with service id 'getAccountActionApproverList6707'
	ExternalUsers_2Repository.prototype.getAccountActionCustomerApproverList = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('getAccountActionCustomerApproverList', params, onCompletion);
	};

	//For Operation 'updateCitizenship' with service id 'UpdateCitizenshipOpearation2649'
	ExternalUsers_2Repository.prototype.updateCitizenship = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('updateCitizenship', params, onCompletion);
	};

	//For Operation 'updateCustomerProfile' with service id 'updateCustomerProfile6713'
	ExternalUsers_2Repository.prototype.updateCustomerProfile = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('updateCustomerProfile', params, onCompletion);
	};

	//For Operation 'requestOTPPreLoginMB' with service id 'RequestPreLoginOTPMB9319'
	ExternalUsers_2Repository.prototype.requestOTPPreLoginMB = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('requestOTPPreLoginMB', params, onCompletion);
	};

	//For Operation 'sendActivationCodeForEnrollment' with service id 'sendActivationCodeForEnrollment6485'
	ExternalUsers_2Repository.prototype.sendActivationCodeForEnrollment = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('sendActivationCodeForEnrollment', params, onCompletion);
	};

	//For Operation 'createCustomerInPartyandT24' with service id 'createCustomerInPartyAndT245144'
	ExternalUsers_2Repository.prototype.createCustomerInPartyandT24 = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('createCustomerInPartyandT24', params, onCompletion);
	};

	//For Operation 'requestMFAOTP' with service id 'RequestMFAOTP8041'
	ExternalUsers_2Repository.prototype.requestMFAOTP = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('requestMFAOTP', params, onCompletion);
	};

	//For Operation 'sendDbxResetPasswordEmail' with service id 'sendDbxResetPasswordLink9649'
	ExternalUsers_2Repository.prototype.sendDbxResetPasswordEmail = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('sendDbxResetPasswordEmail', params, onCompletion);
	};

	//For Operation 'validateActivationCodeForEnrollment' with service id 'ValidateEnrollmentActivationCode7539'
	ExternalUsers_2Repository.prototype.validateActivationCodeForEnrollment = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('validateActivationCodeForEnrollment', params, onCompletion);
	};

	//For Operation 'GetTaxDetails' with service id 'GetTaxOperation1410'
	ExternalUsers_2Repository.prototype.GetTaxDetails = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('GetTaxDetails', params, onCompletion);
	};

	//For Operation 'getMFAServiceConfig' with service id 'getMFAServiceConfig5679'
	ExternalUsers_2Repository.prototype.getMFAServiceConfig = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('getMFAServiceConfig', params, onCompletion);
	};

	//For Operation 'dbxVerifyOTP' with service id 'dbxverifyOTP8700'
	ExternalUsers_2Repository.prototype.dbxVerifyOTP = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('dbxVerifyOTP', params, onCompletion);
	};

	//For Operation 'updateCustomerDetailsForAdmin' with service id 'UpdateCustomerDetails9201'
	ExternalUsers_2Repository.prototype.updateCustomerDetailsForAdmin = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('updateCustomerDetailsForAdmin', params, onCompletion);
	};

	//For Operation 'getBBCustomerServiceLimit' with service id 'getBBCustomerServiceLimit8755'
	ExternalUsers_2Repository.prototype.getBBCustomerServiceLimit = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('getBBCustomerServiceLimit', params, onCompletion);
	};

	//For Operation 'OFACAndCIPChecks' with service id 'OFACAndCIPChecks5574'
	ExternalUsers_2Repository.prototype.OFACAndCIPChecks = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('OFACAndCIPChecks', params, onCompletion);
	};

	//For Operation 'getAPIPasswordLockoutSettings' with service id 'getAPIPasswordLockoutSettings8266'
	ExternalUsers_2Repository.prototype.getAPIPasswordLockoutSettings = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('getAPIPasswordLockoutSettings', params, onCompletion);
	};

	//For Operation 'GetEmploymentDetails' with service id 'GetEmploymentOperation5855'
	ExternalUsers_2Repository.prototype.GetEmploymentDetails = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('GetEmploymentDetails', params, onCompletion);
	};

	//For Operation 'getUserNameRulesAndPolicy' with service id 'getUserNameRulesAndPolicy1255'
	ExternalUsers_2Repository.prototype.getUserNameRulesAndPolicy = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('getUserNameRulesAndPolicy', params, onCompletion);
	};

	//For Operation 'verifyUpdateSecurityQuestionsOTP' with service id 'VerifyOTPPreLogin6144'
	ExternalUsers_2Repository.prototype.verifyUpdateSecurityQuestionsOTP = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('verifyUpdateSecurityQuestionsOTP', params, onCompletion);
	};

	//For Operation 'CreateEmploymentDetails' with service id 'CreateEmploymentOperation5693'
	ExternalUsers_2Repository.prototype.CreateEmploymentDetails = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('CreateEmploymentDetails', params, onCompletion);
	};

	//For Operation 'requestOTPPreLogin' with service id 'RequestNUOOtp1869'
	ExternalUsers_2Repository.prototype.requestOTPPreLogin = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('requestOTPPreLogin', params, onCompletion);
	};

	//For Operation 'getPasswordRules' with service id 'getPasswordRules9416'
	ExternalUsers_2Repository.prototype.getPasswordRules = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('getPasswordRules', params, onCompletion);
	};

	//For Operation 'sendCustomerUnlockEmail' with service id 'sendCustomerUnlockEmail1870'
	ExternalUsers_2Repository.prototype.sendCustomerUnlockEmail = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('sendCustomerUnlockEmail', params, onCompletion);
	};

	//For Operation 'getCustomerDetails' with service id 'GetCustomerDetails2513'
	ExternalUsers_2Repository.prototype.getCustomerDetails = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('getCustomerDetails', params, onCompletion);
	};

	//For Operation 'CreateDbxMicroBusinessOwner' with service id 'createMicroBusinessOwner4821'
	ExternalUsers_2Repository.prototype.CreateDbxMicroBusinessOwner = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('CreateDbxMicroBusinessOwner', params, onCompletion);
	};

	//For Operation 'requestEnrollOTP' with service id 'RequestPreLoginEnrollOTP2387'
	ExternalUsers_2Repository.prototype.requestEnrollOTP = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('requestEnrollOTP', params, onCompletion);
	};

	//For Operation 'deleteUserProfileImage' with service id 'DeleteUserProfileImage1304'
	ExternalUsers_2Repository.prototype.deleteUserProfileImage = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('deleteUserProfileImage', params, onCompletion);
	};

	//For Operation 'downloadEAgreementPdf' with service id 'GetEAgreementPdfDownloaded2866'
	ExternalUsers_2Repository.prototype.downloadEAgreementPdf = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('downloadEAgreementPdf', params, onCompletion);
	};

	//For Operation 'createBBCustomerServiceLimit' with service id 'createBBCustomerServiceLimit1793'
	ExternalUsers_2Repository.prototype.createBBCustomerServiceLimit = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('createBBCustomerServiceLimit', params, onCompletion);
	};

	//For Operation 'createUser' with service id 'CreateDbxUserNew1561'
	ExternalUsers_2Repository.prototype.createUser = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('createUser', params, onCompletion);
	};

	//For Operation 'editBBCustomerServiceLimit' with service id 'editBBCustomerServiceLimit8796'
	ExternalUsers_2Repository.prototype.editBBCustomerServiceLimit = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('editBBCustomerServiceLimit', params, onCompletion);
	};

	//For Operation 'updateCustomerInPartyAndT24' with service id 'updateCustomerInPartyAndT244165'
	ExternalUsers_2Repository.prototype.updateCustomerInPartyAndT24 = function(params, onCompletion){
		return ExternalUsers_2Repository.prototype.customVerb('updateCustomerInPartyAndT24', params, onCompletion);
	};

	return ExternalUsers_2Repository;
})