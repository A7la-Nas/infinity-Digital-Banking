define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ContractRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ContractRepository.prototype = Object.create(BaseRepository.prototype);
	ContractRepository.prototype.constructor = ContractRepository;

	//For Operation 'editContract' with service id 'EditContract6730'
	ContractRepository.prototype.editContract = function(params, onCompletion){
		return ContractRepository.prototype.customVerb('editContract', params, onCompletion);
	};

	//For Operation 'getCompanyAccounts' with service id 'GetCompanyAccounts7697'
	ContractRepository.prototype.getCompanyAccounts = function(params, onCompletion){
		return ContractRepository.prototype.customVerb('getCompanyAccounts', params, onCompletion);
	};

	//For Operation 'enrollContract' with service id 'EnrollContract9854'
	ContractRepository.prototype.enrollContract = function(params, onCompletion){
		return ContractRepository.prototype.customVerb('enrollContract', params, onCompletion);
	};

	//For Operation 'searchContract' with service id 'SearchContract5478'
	ContractRepository.prototype.searchContract = function(params, onCompletion){
		return ContractRepository.prototype.customVerb('searchContract', params, onCompletion);
	};

	//For Operation 'checkIfCompanyExists' with service id 'CheckIfCompanyExists4289'
	ContractRepository.prototype.checkIfCompanyExists = function(params, onCompletion){
		return ContractRepository.prototype.customVerb('checkIfCompanyExists', params, onCompletion);
	};

	//For Operation 'getCoreRelativeCustomers' with service id 'GetCoreCustomerDetails5530'
	ContractRepository.prototype.getCoreRelativeCustomers = function(params, onCompletion){
		return ContractRepository.prototype.customVerb('getCoreRelativeCustomers', params, onCompletion);
	};

	//For Operation 'getListOfContractsByStatus' with service id 'GetListOfContractsByStatus5594'
	ContractRepository.prototype.getListOfContractsByStatus = function(params, onCompletion){
		return ContractRepository.prototype.customVerb('getListOfContractsByStatus', params, onCompletion);
	};

	//For Operation 'getRelativeCoreCustomerContractDetails' with service id 'GetRelativeCoreCustomerContractDetails7027'
	ContractRepository.prototype.getRelativeCoreCustomerContractDetails = function(params, onCompletion){
		return ContractRepository.prototype.customVerb('getRelativeCoreCustomerContractDetails', params, onCompletion);
	};

	//For Operation 'getContractInfinityUsers' with service id 'getContractInfinityUsers4728'
	ContractRepository.prototype.getContractInfinityUsers = function(params, onCompletion){
		return ContractRepository.prototype.customVerb('getContractInfinityUsers', params, onCompletion);
	};

	//For Operation 'searchCoreCustomers' with service id 'SearchCoreCustomers8088'
	ContractRepository.prototype.searchCoreCustomers = function(params, onCompletion){
		return ContractRepository.prototype.customVerb('searchCoreCustomers', params, onCompletion);
	};

	//For Operation 'getContractFeatureActionLimits' with service id 'GetContractFeatureActionLimits9802'
	ContractRepository.prototype.getContractFeatureActionLimits = function(params, onCompletion){
		return ContractRepository.prototype.customVerb('getContractFeatureActionLimits', params, onCompletion);
	};

	//For Operation 'getContractDetails' with service id 'GetContractDetails7121'
	ContractRepository.prototype.getContractDetails = function(params, onCompletion){
		return ContractRepository.prototype.customVerb('getContractDetails', params, onCompletion);
	};

	//For Operation 'getCoreCustomerRoleFeatureActionLimits' with service id 'GetCoreCustomerRoleFeatureActionLimits1380'
	ContractRepository.prototype.getCoreCustomerRoleFeatureActionLimits = function(params, onCompletion){
		return ContractRepository.prototype.customVerb('getCoreCustomerRoleFeatureActionLimits', params, onCompletion);
	};

	//For Operation 'getContractAccounts' with service id 'GetContractAccounts8656'
	ContractRepository.prototype.getContractAccounts = function(params, onCompletion){
		return ContractRepository.prototype.customVerb('getContractAccounts', params, onCompletion);
	};

	//For Operation 'createContract' with service id 'CreateContract9500'
	ContractRepository.prototype.createContract = function(params, onCompletion){
		return ContractRepository.prototype.customVerb('createContract', params, onCompletion);
	};

	//For Operation 'getCoreCustomerAccounts' with service id 'GetCoreCustomerAccounts8645'
	ContractRepository.prototype.getCoreCustomerAccounts = function(params, onCompletion){
		return ContractRepository.prototype.customVerb('getCoreCustomerAccounts', params, onCompletion);
	};

	//For Operation 'getCoreCustomerContractDetails' with service id 'GetCoreCustomerContractDetails4183'
	ContractRepository.prototype.getCoreCustomerContractDetails = function(params, onCompletion){
		return ContractRepository.prototype.customVerb('getCoreCustomerContractDetails', params, onCompletion);
	};

	//For Operation 'updateContractStatus' with service id 'UpdateContractStatus2615'
	ContractRepository.prototype.updateContractStatus = function(params, onCompletion){
		return ContractRepository.prototype.customVerb('updateContractStatus', params, onCompletion);
	};

	return ContractRepository;
})