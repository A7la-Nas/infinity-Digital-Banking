define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function AnchorFundingRequestRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	AnchorFundingRequestRepository.prototype = Object.create(BaseRepository.prototype);
	AnchorFundingRequestRepository.prototype.constructor = AnchorFundingRequestRepository;

	//For Operation 'saveFundingRequest' with service id 'SaveAnchorFundingRequestOperation4198'
	AnchorFundingRequestRepository.prototype.saveFundingRequest = function(params, onCompletion){
		return AnchorFundingRequestRepository.prototype.customVerb('saveFundingRequest', params, onCompletion);
	};

	//For Operation 'getAllFundingRequests' with service id 'GetAllFundingRequestOperation6367'
	AnchorFundingRequestRepository.prototype.getAllFundingRequests = function(params, onCompletion){
		return AnchorFundingRequestRepository.prototype.customVerb('getAllFundingRequests', params, onCompletion);
	};

	//For Operation 'cancelFundingRequest' with service id 'CancelAnchorFundingRequest1849'
	AnchorFundingRequestRepository.prototype.cancelFundingRequest = function(params, onCompletion){
		return AnchorFundingRequestRepository.prototype.customVerb('cancelFundingRequest', params, onCompletion);
	};

	//For Operation 'submitFundingRequest' with service id 'SubmitAnchorFundingRequest6709'
	AnchorFundingRequestRepository.prototype.submitFundingRequest = function(params, onCompletion){
		return AnchorFundingRequestRepository.prototype.customVerb('submitFundingRequest', params, onCompletion);
	};

	return AnchorFundingRequestRepository;
})