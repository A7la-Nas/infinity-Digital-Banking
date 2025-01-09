define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ReceivedGuaranteesRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ReceivedGuaranteesRepository.prototype = Object.create(BaseRepository.prototype);
	ReceivedGuaranteesRepository.prototype.constructor = ReceivedGuaranteesRepository;

	//For Operation 'generateGuaranteesList' with service id 'GenerateReceivedGuaranteesList5697'
	ReceivedGuaranteesRepository.prototype.generateGuaranteesList = function(params, onCompletion){
		return ReceivedGuaranteesRepository.prototype.customVerb('generateGuaranteesList', params, onCompletion);
	};

	//For Operation 'createGuarantee' with service id 'createGuarantees7223'
	ReceivedGuaranteesRepository.prototype.createGuarantee = function(params, onCompletion){
		return ReceivedGuaranteesRepository.prototype.customVerb('createGuarantee', params, onCompletion);
	};

	//For Operation 'generateClaimsList' with service id 'GenerateReceivedClaimsList8581'
	ReceivedGuaranteesRepository.prototype.generateClaimsList = function(params, onCompletion){
		return ReceivedGuaranteesRepository.prototype.customVerb('generateClaimsList', params, onCompletion);
	};

	//For Operation 'generateReceivedGuaranteeClaim' with service id 'GenerateReceivedGuaranteeClaim3783'
	ReceivedGuaranteesRepository.prototype.generateReceivedGuaranteeClaim = function(params, onCompletion){
		return ReceivedGuaranteesRepository.prototype.customVerb('generateReceivedGuaranteeClaim', params, onCompletion);
	};

	//For Operation 'updateAmendment' with service id 'UpdateReceivedAmendment9954'
	ReceivedGuaranteesRepository.prototype.updateAmendment = function(params, onCompletion){
		return ReceivedGuaranteesRepository.prototype.customVerb('updateAmendment', params, onCompletion);
	};

	//For Operation 'updateGuarantee' with service id 'UpdateReceivedGuarantee3557'
	ReceivedGuaranteesRepository.prototype.updateGuarantee = function(params, onCompletion){
		return ReceivedGuaranteesRepository.prototype.customVerb('updateGuarantee', params, onCompletion);
	};

	//For Operation 'generateGuaranteeReport' with service id 'GeneratePdfReceivedGuarantees1423'
	ReceivedGuaranteesRepository.prototype.generateGuaranteeReport = function(params, onCompletion){
		return ReceivedGuaranteesRepository.prototype.customVerb('generateGuaranteeReport', params, onCompletion);
	};

	//For Operation 'updateAmendmentByBank' with service id 'UpdateReceivedAmendmentByBank5228'
	ReceivedGuaranteesRepository.prototype.updateAmendmentByBank = function(params, onCompletion){
		return ReceivedGuaranteesRepository.prototype.customVerb('updateAmendmentByBank', params, onCompletion);
	};

	//For Operation 'UpdateReceivedGuaranteeClaim' with service id 'UpdateReceivedGuaranteeClaim7686'
	ReceivedGuaranteesRepository.prototype.UpdateReceivedGuaranteeClaim = function(params, onCompletion){
		return ReceivedGuaranteesRepository.prototype.customVerb('UpdateReceivedGuaranteeClaim', params, onCompletion);
	};

	//For Operation 'generateAmendmentsList' with service id 'GenerateReceivedAmendmentsList6659'
	ReceivedGuaranteesRepository.prototype.generateAmendmentsList = function(params, onCompletion){
		return ReceivedGuaranteesRepository.prototype.customVerb('generateAmendmentsList', params, onCompletion);
	};

	//For Operation 'updateGuaranteeByBank' with service id 'UpdateReceivedGuaranteeByBank4435'
	ReceivedGuaranteesRepository.prototype.updateGuaranteeByBank = function(params, onCompletion){
		return ReceivedGuaranteesRepository.prototype.customVerb('updateGuaranteeByBank', params, onCompletion);
	};

	//For Operation 'createAmendment' with service id 'CreateReceivedAmendment1230'
	ReceivedGuaranteesRepository.prototype.createAmendment = function(params, onCompletion){
		return ReceivedGuaranteesRepository.prototype.customVerb('createAmendment', params, onCompletion);
	};

	//For Operation 'getGuaranteeById' with service id 'GetReceivedGuaranteeById5731'
	ReceivedGuaranteesRepository.prototype.getGuaranteeById = function(params, onCompletion){
		return ReceivedGuaranteesRepository.prototype.customVerb('getGuaranteeById', params, onCompletion);
	};

	//For Operation 'releaseLiability' with service id 'ReceivedGuaranteeReleaseLiability4378'
	ReceivedGuaranteesRepository.prototype.releaseLiability = function(params, onCompletion){
		return ReceivedGuaranteesRepository.prototype.customVerb('releaseLiability', params, onCompletion);
	};

	//For Operation 'GetGuaranteeClaimsById' with service id 'GetReceivedGuaranteeClaimsById5318'
	ReceivedGuaranteesRepository.prototype.GetGuaranteeClaimsById = function(params, onCompletion){
		return ReceivedGuaranteesRepository.prototype.customVerb('GetGuaranteeClaimsById', params, onCompletion);
	};

	//For Operation 'UpdateReceivedGuaranteeClaimByBank' with service id 'UpdateReceivedGuaranteeClaimByBank3559'
	ReceivedGuaranteesRepository.prototype.UpdateReceivedGuaranteeClaimByBank = function(params, onCompletion){
		return ReceivedGuaranteesRepository.prototype.customVerb('UpdateReceivedGuaranteeClaimByBank', params, onCompletion);
	};

	//For Operation 'CreateGuaranteeClaims' with service id 'CreateClaimOnGuaranteeReceived1215'
	ReceivedGuaranteesRepository.prototype.CreateGuaranteeClaims = function(params, onCompletion){
		return ReceivedGuaranteesRepository.prototype.customVerb('CreateGuaranteeClaims', params, onCompletion);
	};

	//For Operation 'SaveGuaranteeClaims' with service id 'SaveReceivedGuaranteeClaims6681'
	ReceivedGuaranteesRepository.prototype.SaveGuaranteeClaims = function(params, onCompletion){
		return ReceivedGuaranteesRepository.prototype.customVerb('SaveGuaranteeClaims', params, onCompletion);
	};

	//For Operation 'getAmendments' with service id 'GetReceivedAmendments4004'
	ReceivedGuaranteesRepository.prototype.getAmendments = function(params, onCompletion){
		return ReceivedGuaranteesRepository.prototype.customVerb('getAmendments', params, onCompletion);
	};

	//For Operation 'GetGuaranteeClaims' with service id 'GetReceivedGuaranteeClaims9882'
	ReceivedGuaranteesRepository.prototype.GetGuaranteeClaims = function(params, onCompletion){
		return ReceivedGuaranteesRepository.prototype.customVerb('GetGuaranteeClaims', params, onCompletion);
	};

	//For Operation 'generateAmendmentReport' with service id 'GeneratePdfReceivedAmendment4716'
	ReceivedGuaranteesRepository.prototype.generateAmendmentReport = function(params, onCompletion){
		return ReceivedGuaranteesRepository.prototype.customVerb('generateAmendmentReport', params, onCompletion);
	};

	//For Operation 'getAmendmentById' with service id 'GetReceivedAmendmentById3740'
	ReceivedGuaranteesRepository.prototype.getAmendmentById = function(params, onCompletion){
		return ReceivedGuaranteesRepository.prototype.customVerb('getAmendmentById', params, onCompletion);
	};

	//For Operation 'deleteGuaranteeClaim' with service id 'DeleteReceivedGuaranteeClaim3644'
	ReceivedGuaranteesRepository.prototype.deleteGuaranteeClaim = function(params, onCompletion){
		return ReceivedGuaranteesRepository.prototype.customVerb('deleteGuaranteeClaim', params, onCompletion);
	};

	//For Operation 'getGuarantees' with service id 'GetGuarantees3906'
	ReceivedGuaranteesRepository.prototype.getGuarantees = function(params, onCompletion){
		return ReceivedGuaranteesRepository.prototype.customVerb('getGuarantees', params, onCompletion);
	};

	return ReceivedGuaranteesRepository;
})