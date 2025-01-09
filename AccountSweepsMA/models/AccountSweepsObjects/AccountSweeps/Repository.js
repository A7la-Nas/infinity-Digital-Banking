define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function AccountSweepsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	AccountSweepsRepository.prototype = Object.create(BaseRepository.prototype);
	AccountSweepsRepository.prototype.constructor = AccountSweepsRepository;

	//For Operation 'editAccountSweep' with service id 'EditAccountSweep1460'
	AccountSweepsRepository.prototype.editAccountSweep = function(params, onCompletion){
		return AccountSweepsRepository.prototype.customVerb('editAccountSweep', params, onCompletion);
	};

	//For Operation 'getAccountSweeps' with service id 'GetAccountSweeps2639'
	AccountSweepsRepository.prototype.getAccountSweeps = function(params, onCompletion){
		return AccountSweepsRepository.prototype.customVerb('getAccountSweeps', params, onCompletion);
	};

	//For Operation 'deleteAccountSweep' with service id 'DeleteAccountSweep7570'
	AccountSweepsRepository.prototype.deleteAccountSweep = function(params, onCompletion){
		return AccountSweepsRepository.prototype.customVerb('deleteAccountSweep', params, onCompletion);
	};

	//For Operation 'initiateDownloadAccountSweeps' with service id 'InitiateDownloadAccountSweep6305'
	AccountSweepsRepository.prototype.initiateDownloadAccountSweeps = function(params, onCompletion){
		return AccountSweepsRepository.prototype.customVerb('initiateDownloadAccountSweeps', params, onCompletion);
	};

	//For Operation 'createAccountSweep' with service id 'CreateAccountSweeps6399'
	AccountSweepsRepository.prototype.createAccountSweep = function(params, onCompletion){
		return AccountSweepsRepository.prototype.customVerb('createAccountSweep', params, onCompletion);
	};

	//For Operation 'getAccountSweepById' with service id 'GetAccountSweepById4341'
	AccountSweepsRepository.prototype.getAccountSweepById = function(params, onCompletion){
		return AccountSweepsRepository.prototype.customVerb('getAccountSweepById', params, onCompletion);
	};

	return AccountSweepsRepository;
})