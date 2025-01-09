define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ApprovalModeRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ApprovalModeRepository.prototype = Object.create(BaseRepository.prototype);
	ApprovalModeRepository.prototype.constructor = ApprovalModeRepository;

	//For Operation 'updateApprovalMode' with service id 'updateApprovalMode3669'
	ApprovalModeRepository.prototype.updateApprovalMode = function(params, onCompletion){
		return ApprovalModeRepository.prototype.customVerb('updateApprovalMode', params, onCompletion);
	};

	//For Operation 'fetchApprovalMode' with service id 'fetchApprovalMode9772'
	ApprovalModeRepository.prototype.fetchApprovalMode = function(params, onCompletion){
		return ApprovalModeRepository.prototype.customVerb('fetchApprovalMode', params, onCompletion);
	};

	//For Operation 'deleteApprovalMode' with service id 'deleteApprovalMode3113'
	ApprovalModeRepository.prototype.deleteApprovalMode = function(params, onCompletion){
		return ApprovalModeRepository.prototype.customVerb('deleteApprovalMode', params, onCompletion);
	};

	return ApprovalModeRepository;
})