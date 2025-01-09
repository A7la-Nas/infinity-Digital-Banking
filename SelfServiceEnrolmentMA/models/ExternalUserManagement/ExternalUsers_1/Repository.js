define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ExternalUsers_1Repository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ExternalUsers_1Repository.prototype = Object.create(BaseRepository.prototype);
	ExternalUsers_1Repository.prototype.constructor = ExternalUsers_1Repository;

	//For Operation 'createInfinityProspect' with service id 'CreateProspectOperation3370'
	ExternalUsers_1Repository.prototype.createInfinityProspect = function(params, onCompletion){
		return ExternalUsers_1Repository.prototype.customVerb('createInfinityProspect', params, onCompletion);
	};

	//For Operation 'getCustomersForUser' with service id 'getAssociatedCustomers1309'
	ExternalUsers_1Repository.prototype.getCustomersForUser = function(params, onCompletion){
		return ExternalUsers_1Repository.prototype.customVerb('getCustomersForUser', params, onCompletion);
	};

	//For Operation 'getInfinityUserContractDetails' with service id 'GetInfinityUserContractDetails7453'
	ExternalUsers_1Repository.prototype.getInfinityUserContractDetails = function(params, onCompletion){
		return ExternalUsers_1Repository.prototype.customVerb('getInfinityUserContractDetails', params, onCompletion);
	};

	//For Operation 'editUser' with service id 'editInfinityUser4362'
	ExternalUsers_1Repository.prototype.editUser = function(params, onCompletion){
		return ExternalUsers_1Repository.prototype.customVerb('editUser', params, onCompletion);
	};

	//For Operation 'assignInfinityUserToPrimaryRetailContract' with service id 'assignInfinityUserToPrimaryRetailContract7867'
	ExternalUsers_1Repository.prototype.assignInfinityUserToPrimaryRetailContract = function(params, onCompletion){
		return ExternalUsers_1Repository.prototype.customVerb('assignInfinityUserToPrimaryRetailContract', params, onCompletion);
	};

	//For Operation 'getUsersFromContract' with service id 'GetAssociatedContractUsers3892'
	ExternalUsers_1Repository.prototype.getUsersFromContract = function(params, onCompletion){
		return ExternalUsers_1Repository.prototype.customVerb('getUsersFromContract', params, onCompletion);
	};

	//For Operation 'enrollRetailUser' with service id 'EnrollRetailUser3249'
	ExternalUsers_1Repository.prototype.enrollRetailUser = function(params, onCompletion){
		return ExternalUsers_1Repository.prototype.customVerb('enrollRetailUser', params, onCompletion);
	};

	//For Operation 'getInfinityUserLimits' with service id 'GetInfinityUserLimits1247'
	ExternalUsers_1Repository.prototype.getInfinityUserLimits = function(params, onCompletion){
		return ExternalUsers_1Repository.prototype.customVerb('getInfinityUserLimits', params, onCompletion);
	};

	//For Operation 'GetListCoreCustomerFeatureActionLimits' with service id 'GetListCoreCustomerFeatureActionLimits3221'
	ExternalUsers_1Repository.prototype.GetListCoreCustomerFeatureActionLimits = function(params, onCompletion){
		return ExternalUsers_1Repository.prototype.customVerb('GetListCoreCustomerFeatureActionLimits', params, onCompletion);
	};

	//For Operation 'getInfinityUserContractCoreCustomerActions' with service id 'GetInfinityUserContractCoreCustomerActions3789'
	ExternalUsers_1Repository.prototype.getInfinityUserContractCoreCustomerActions = function(params, onCompletion){
		return ExternalUsers_1Repository.prototype.customVerb('getInfinityUserContractCoreCustomerActions', params, onCompletion);
	};

	//For Operation 'CreateInfinityUserWithContract' with service id 'CreateInfinityUserWithContract3507'
	ExternalUsers_1Repository.prototype.CreateInfinityUserWithContract = function(params, onCompletion){
		return ExternalUsers_1Repository.prototype.customVerb('CreateInfinityUserWithContract', params, onCompletion);
	};

	//For Operation 'getRelatedCustomers' with service id 'getAllEligibleRelationalCustomers6195'
	ExternalUsers_1Repository.prototype.getRelatedCustomers = function(params, onCompletion){
		return ExternalUsers_1Repository.prototype.customVerb('getRelatedCustomers', params, onCompletion);
	};

	//For Operation 'updateInfinityUserStatus' with service id 'UpdateInfinityUserStatus6443'
	ExternalUsers_1Repository.prototype.updateInfinityUserStatus = function(params, onCompletion){
		return ExternalUsers_1Repository.prototype.customVerb('updateInfinityUserStatus', params, onCompletion);
	};

	//For Operation 'getInfinityUserAccounts' with service id 'GetInfinityUserAccounts1944'
	ExternalUsers_1Repository.prototype.getInfinityUserAccounts = function(params, onCompletion){
		return ExternalUsers_1Repository.prototype.customVerb('getInfinityUserAccounts', params, onCompletion);
	};

	//For Operation 'resendActivationCode' with service id 'SendInfinityUserUserNameAndActivationCode2697'
	ExternalUsers_1Repository.prototype.resendActivationCode = function(params, onCompletion){
		return ExternalUsers_1Repository.prototype.customVerb('resendActivationCode', params, onCompletion);
	};

	//For Operation 'getInfinityUserFeatureActions' with service id 'GetInfinityUserFeatureActions4845'
	ExternalUsers_1Repository.prototype.getInfinityUserFeatureActions = function(params, onCompletion){
		return ExternalUsers_1Repository.prototype.customVerb('getInfinityUserFeatureActions', params, onCompletion);
	};

	//For Operation 'createRetailContract' with service id 'CreateRetailContract9160'
	ExternalUsers_1Repository.prototype.createRetailContract = function(params, onCompletion){
		return ExternalUsers_1Repository.prototype.customVerb('createRetailContract', params, onCompletion);
	};

	//For Operation 'getCoreCustomerFeatureActionLimits' with service id 'GetCoreCustomerFeatureActionLimits8284'
	ExternalUsers_1Repository.prototype.getCoreCustomerFeatureActionLimits = function(params, onCompletion){
		return ExternalUsers_1Repository.prototype.customVerb('getCoreCustomerFeatureActionLimits', params, onCompletion);
	};

	//For Operation 'getCustomRoleByCompanyID' with service id 'GetCustomRoleByCompanyID5803'
	ExternalUsers_1Repository.prototype.getCustomRoleByCompanyID = function(params, onCompletion){
		return ExternalUsers_1Repository.prototype.customVerb('getCustomRoleByCompanyID', params, onCompletion);
	};

	//For Operation 'getUserDetails' with service id 'getInfinityUser6429'
	ExternalUsers_1Repository.prototype.getUserDetails = function(params, onCompletion){
		return ExternalUsers_1Repository.prototype.customVerb('getUserDetails', params, onCompletion);
	};

	//For Operation 'getUserApprovalPermissions' with service id 'GetUserApprovalPermissions5351'
	ExternalUsers_1Repository.prototype.getUserApprovalPermissions = function(params, onCompletion){
		return ExternalUsers_1Repository.prototype.customVerb('getUserApprovalPermissions', params, onCompletion);
	};

	//For Operation 'createBusinessContract' with service id 'CreateBusinessContract6320'
	ExternalUsers_1Repository.prototype.createBusinessContract = function(params, onCompletion){
		return ExternalUsers_1Repository.prototype.customVerb('createBusinessContract', params, onCompletion);
	};

	//For Operation 'updateInfinityProspect' with service id 'UpdateProspect8581'
	ExternalUsers_1Repository.prototype.updateInfinityProspect = function(params, onCompletion){
		return ExternalUsers_1Repository.prototype.customVerb('updateInfinityProspect', params, onCompletion);
	};

	//For Operation 'getInfinityUserContractCustomers' with service id 'GetInfinityUserContractCustomers6762'
	ExternalUsers_1Repository.prototype.getInfinityUserContractCustomers = function(params, onCompletion){
		return ExternalUsers_1Repository.prototype.customVerb('getInfinityUserContractCustomers', params, onCompletion);
	};

	//For Operation 'createUser' with service id 'createInfinityUser3399'
	ExternalUsers_1Repository.prototype.createUser = function(params, onCompletion){
		return ExternalUsers_1Repository.prototype.customVerb('createUser', params, onCompletion);
	};

	return ExternalUsers_1Repository;
})