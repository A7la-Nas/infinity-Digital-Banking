define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ExternalUsersRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ExternalUsersRepository.prototype = Object.create(BaseRepository.prototype);
	ExternalUsersRepository.prototype.constructor = ExternalUsersRepository;

	//For Operation 'getReferenceById' with service id 'GetReferenceById2172'
	ExternalUsersRepository.prototype.getReferenceById = function(params, onCompletion){
		return ExternalUsersRepository.prototype.customVerb('getReferenceById', params, onCompletion);
	};

	//For Operation 'UpdateDetails' with service id 'updateCustomerDetailsOperation7424'
	ExternalUsersRepository.prototype.UpdateDetails = function(params, onCompletion){
		return ExternalUsersRepository.prototype.customVerb('UpdateDetails', params, onCompletion);
	};

	//For Operation 'UpdateAddressWithProof' with service id 'UpdateAddressWithDocsOperation1973'
	ExternalUsersRepository.prototype.UpdateAddressWithProof = function(params, onCompletion){
		return ExternalUsersRepository.prototype.customVerb('UpdateAddressWithProof', params, onCompletion);
	};

	//For Operation 'checkUserEnrolled' with service id 'CheckUserEnrolled2370'
	ExternalUsersRepository.prototype.checkUserEnrolled = function(params, onCompletion){
		return ExternalUsersRepository.prototype.customVerb('checkUserEnrolled', params, onCompletion);
	};

	//For Operation 'geRequestStatus' with service id 'GetOrderDetailsOperation6962'
	ExternalUsersRepository.prototype.geRequestStatus = function(params, onCompletion){
		return ExternalUsersRepository.prototype.customVerb('geRequestStatus', params, onCompletion);
	};

	//For Operation 'getCustomerIdentifiers' with service id 'getCustomerIdentifiers2800'
	ExternalUsersRepository.prototype.getCustomerIdentifiers = function(params, onCompletion){
		return ExternalUsersRepository.prototype.customVerb('getCustomerIdentifiers', params, onCompletion);
	};

	//For Operation 'verifyExistingPassword' with service id 'verifyExistingPassword1245'
	ExternalUsersRepository.prototype.verifyExistingPassword = function(params, onCompletion){
		return ExternalUsersRepository.prototype.customVerb('verifyExistingPassword', params, onCompletion);
	};

	return ExternalUsersRepository;
})