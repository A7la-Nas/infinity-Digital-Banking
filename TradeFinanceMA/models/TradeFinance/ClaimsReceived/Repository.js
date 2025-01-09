define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ClaimsReceivedRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ClaimsReceivedRepository.prototype = Object.create(BaseRepository.prototype);
	ClaimsReceivedRepository.prototype.constructor = ClaimsReceivedRepository;

	//For Operation 'updateClaim' with service id 'UpdateIssuedGuaranteeClaim2029'
	ClaimsReceivedRepository.prototype.updateClaim = function(params, onCompletion){
		return ClaimsReceivedRepository.prototype.customVerb('updateClaim', params, onCompletion);
	};

	//For Operation 'updateClaimByBank' with service id 'UpdateIssuedGuaranteeClaimByBank5503'
	ClaimsReceivedRepository.prototype.updateClaimByBank = function(params, onCompletion){
		return ClaimsReceivedRepository.prototype.customVerb('updateClaimByBank', params, onCompletion);
	};

	//For Operation 'generateClaimsList' with service id 'GenerateIssuedClaimsList6140'
	ClaimsReceivedRepository.prototype.generateClaimsList = function(params, onCompletion){
		return ClaimsReceivedRepository.prototype.customVerb('generateClaimsList', params, onCompletion);
	};

	//For Operation 'getClaimById' with service id 'GetIssuedGuaranteeClaimById8016'
	ClaimsReceivedRepository.prototype.getClaimById = function(params, onCompletion){
		return ClaimsReceivedRepository.prototype.customVerb('getClaimById', params, onCompletion);
	};

	//For Operation 'createClaim' with service id 'createIssuedGuaranteeClaim4084'
	ClaimsReceivedRepository.prototype.createClaim = function(params, onCompletion){
		return ClaimsReceivedRepository.prototype.customVerb('createClaim', params, onCompletion);
	};

	//For Operation 'generateClaimReport' with service id 'GenerateIssuedGuaranteeClaim4134'
	ClaimsReceivedRepository.prototype.generateClaimReport = function(params, onCompletion){
		return ClaimsReceivedRepository.prototype.customVerb('generateClaimReport', params, onCompletion);
	};

	//For Operation 'getClaims' with service id 'GetIssuedGuaranteeClaims8964'
	ClaimsReceivedRepository.prototype.getClaims = function(params, onCompletion){
		return ClaimsReceivedRepository.prototype.customVerb('getClaims', params, onCompletion);
	};

	return ClaimsReceivedRepository;
})