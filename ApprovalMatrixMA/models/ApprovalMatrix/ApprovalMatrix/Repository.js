define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ApprovalMatrixRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ApprovalMatrixRepository.prototype = Object.create(BaseRepository.prototype);
	ApprovalMatrixRepository.prototype.constructor = ApprovalMatrixRepository;

	//For Operation 'updateApprovalMatrixStatus' with service id 'updateApprovalMatrixStatus5809'
	ApprovalMatrixRepository.prototype.updateApprovalMatrixStatus = function(params, onCompletion){
		return ApprovalMatrixRepository.prototype.customVerb('updateApprovalMatrixStatus', params, onCompletion);
	};

	//For Operation 'getApprovalMatrix' with service id 'fetchApprovalMatrix5483'
	ApprovalMatrixRepository.prototype.getApprovalMatrix = function(params, onCompletion){
		return ApprovalMatrixRepository.prototype.customVerb('getApprovalMatrix', params, onCompletion);
	};

	//For Operation 'getApprovalMatrixByContractId' with service id 'fetchApprovalMatrixByContractId1145'
	ApprovalMatrixRepository.prototype.getApprovalMatrixByContractId = function(params, onCompletion){
		return ApprovalMatrixRepository.prototype.customVerb('getApprovalMatrixByContractId', params, onCompletion);
	};

	//For Operation 'isApprovalMatrixDisabled' with service id 'isApprovalMatrixDisabled2643'
	ApprovalMatrixRepository.prototype.isApprovalMatrixDisabled = function(params, onCompletion){
		return ApprovalMatrixRepository.prototype.customVerb('isApprovalMatrixDisabled', params, onCompletion);
	};

	//For Operation 'updateApprovalMatrix' with service id 'UpdateApprovalMatrixService4926'
	ApprovalMatrixRepository.prototype.updateApprovalMatrix = function(params, onCompletion){
		return ApprovalMatrixRepository.prototype.customVerb('updateApprovalMatrix', params, onCompletion);
	};

	return ApprovalMatrixRepository;
})