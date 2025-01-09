define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ApprovalRulesRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ApprovalRulesRepository.prototype = Object.create(BaseRepository.prototype);
	ApprovalRulesRepository.prototype.constructor = ApprovalRulesRepository;

	//For Operation 'getApprovalRules' with service id 'getApprovalRules5996'
	ApprovalRulesRepository.prototype.getApprovalRules = function(params, onCompletion){
		return ApprovalRulesRepository.prototype.customVerb('getApprovalRules', params, onCompletion);
	};

	return ApprovalRulesRepository;
})