define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function GuaranteesRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	GuaranteesRepository.prototype = Object.create(BaseRepository.prototype);
	GuaranteesRepository.prototype.constructor = GuaranteesRepository;

	//For Operation 'getClauses' with service id 'getClauses3469'
	GuaranteesRepository.prototype.getClauses = function(params, onCompletion){
		return GuaranteesRepository.prototype.customVerb('getClauses', params, onCompletion);
	};

	//For Operation 'createGuarantees' with service id 'createGuarantees5896'
	GuaranteesRepository.prototype.createGuarantees = function(params, onCompletion){
		return GuaranteesRepository.prototype.customVerb('createGuarantees', params, onCompletion);
	};

	//For Operation 'saveGuarantees' with service id 'saveGuarantees2652'
	GuaranteesRepository.prototype.saveGuarantees = function(params, onCompletion){
		return GuaranteesRepository.prototype.customVerb('saveGuarantees', params, onCompletion);
	};

	//For Operation 'getGuaranteeAmendments' with service id 'GetGuaranteeLCAmendments7172'
	GuaranteesRepository.prototype.getGuaranteeAmendments = function(params, onCompletion){
		return GuaranteesRepository.prototype.customVerb('getGuaranteeAmendments', params, onCompletion);
	};

	//For Operation 'updateGuaranteeLetterOfCredit' with service id 'UpdateGuaranteeLetterOfCredit1549'
	GuaranteesRepository.prototype.updateGuaranteeLetterOfCredit = function(params, onCompletion){
		return GuaranteesRepository.prototype.customVerb('updateGuaranteeLetterOfCredit', params, onCompletion);
	};

	//For Operation 'updateGuaranteeLcByBank' with service id 'UpdateGuaranteeLcByBank5547'
	GuaranteesRepository.prototype.updateGuaranteeLcByBank = function(params, onCompletion){
		return GuaranteesRepository.prototype.customVerb('updateGuaranteeLcByBank', params, onCompletion);
	};

	//For Operation 'DeleteGuaranteeLetterOfCredit' with service id 'DeleteGuaranteeLetterOfCredit4718'
	GuaranteesRepository.prototype.DeleteGuaranteeLetterOfCredit = function(params, onCompletion){
		return GuaranteesRepository.prototype.customVerb('DeleteGuaranteeLetterOfCredit', params, onCompletion);
	};

	//For Operation 'updateGuaranteeAmendment' with service id 'updateGuaranteeAmendment3210'
	GuaranteesRepository.prototype.updateGuaranteeAmendment = function(params, onCompletion){
		return GuaranteesRepository.prototype.customVerb('updateGuaranteeAmendment', params, onCompletion);
	};

	//For Operation 'createClause' with service id 'createClause7329'
	GuaranteesRepository.prototype.createClause = function(params, onCompletion){
		return GuaranteesRepository.prototype.customVerb('createClause', params, onCompletion);
	};

	//For Operation 'getLimitInstructions' with service id 'GetLimitInstructions5155'
	GuaranteesRepository.prototype.getLimitInstructions = function(params, onCompletion){
		return GuaranteesRepository.prototype.customVerb('getLimitInstructions', params, onCompletion);
	};

	//For Operation 'createGuaranteeAmendment' with service id 'CreateGuaranteeLCAmendment8000'
	GuaranteesRepository.prototype.createGuaranteeAmendment = function(params, onCompletion){
		return GuaranteesRepository.prototype.customVerb('createGuaranteeAmendment', params, onCompletion);
	};

	//For Operation 'getGuaranteeAmendmentById' with service id 'GetGuaranteeLCAmendmentById2101'
	GuaranteesRepository.prototype.getGuaranteeAmendmentById = function(params, onCompletion){
		return GuaranteesRepository.prototype.customVerb('getGuaranteeAmendmentById', params, onCompletion);
	};

	//For Operation 'getGuaranteesById' with service id 'getGuaranteesById6187'
	GuaranteesRepository.prototype.getGuaranteesById = function(params, onCompletion){
		return GuaranteesRepository.prototype.customVerb('getGuaranteesById', params, onCompletion);
	};

	//For Operation 'getGuarantees' with service id 'GetGuarantees9393'
	GuaranteesRepository.prototype.getGuarantees = function(params, onCompletion){
		return GuaranteesRepository.prototype.customVerb('getGuarantees', params, onCompletion);
	};

	//For Operation 'updateClause' with service id 'updateClause8208'
	GuaranteesRepository.prototype.updateClause = function(params, onCompletion){
		return GuaranteesRepository.prototype.customVerb('updateClause', params, onCompletion);
	};

	//For Operation 'generateGuaranteeAmendmentList' with service id 'GenerateGuaranteeAmendmentList2417'
	GuaranteesRepository.prototype.generateGuaranteeAmendmentList = function(params, onCompletion){
		return GuaranteesRepository.prototype.customVerb('generateGuaranteeAmendmentList', params, onCompletion);
	};

	//For Operation 'updateGuaranteeAmendmentByBank' with service id 'updateGuaranteeAmendmentByBank9650'
	GuaranteesRepository.prototype.updateGuaranteeAmendmentByBank = function(params, onCompletion){
		return GuaranteesRepository.prototype.customVerb('updateGuaranteeAmendmentByBank', params, onCompletion);
	};

	//For Operation 'generateGuaranteeAmendment' with service id 'GeneratePDFGuaranteeLCAmendment4776'
	GuaranteesRepository.prototype.generateGuaranteeAmendment = function(params, onCompletion){
		return GuaranteesRepository.prototype.customVerb('generateGuaranteeAmendment', params, onCompletion);
	};

	//For Operation 'generateGuarantees' with service id 'generateGuarantees6203'
	GuaranteesRepository.prototype.generateGuarantees = function(params, onCompletion){
		return GuaranteesRepository.prototype.customVerb('generateGuarantees', params, onCompletion);
	};

	//For Operation 'UpdateIssuedGuaranteeClaimByBank' with service id 'UpdateIssuedGuaranteeClaimByBank4988'
	GuaranteesRepository.prototype.UpdateIssuedGuaranteeClaimByBank = function(params, onCompletion){
		return GuaranteesRepository.prototype.customVerb('UpdateIssuedGuaranteeClaimByBank', params, onCompletion);
	};

	return GuaranteesRepository;
})