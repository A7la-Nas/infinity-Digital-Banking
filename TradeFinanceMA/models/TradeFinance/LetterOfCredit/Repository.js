define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function LetterOfCreditRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	LetterOfCreditRepository.prototype = Object.create(BaseRepository.prototype);
	LetterOfCreditRepository.prototype.constructor = LetterOfCreditRepository;

	//For Operation 'updateImportLCByBank' with service id 'UpdateImportLCByBank7158'
	LetterOfCreditRepository.prototype.updateImportLCByBank = function(params, onCompletion){
		return LetterOfCreditRepository.prototype.customVerb('updateImportLCByBank', params, onCompletion);
	};

	//For Operation 'deleteImportLC' with service id 'createLetterOfCredits8652'
	LetterOfCreditRepository.prototype.deleteImportLC = function(params, onCompletion){
		return LetterOfCreditRepository.prototype.customVerb('deleteImportLC', params, onCompletion);
	};

	//For Operation 'updateImportLCAmendmentByBank' with service id 'UpdateImportLCAmendmentByBank4949'
	LetterOfCreditRepository.prototype.updateImportLCAmendmentByBank = function(params, onCompletion){
		return LetterOfCreditRepository.prototype.customVerb('updateImportLCAmendmentByBank', params, onCompletion);
	};

	//For Operation 'getImportLetterOfCreditAmendments' with service id 'getImportLetterOfCreditAmendments6245'
	LetterOfCreditRepository.prototype.getImportLetterOfCreditAmendments = function(params, onCompletion){
		return LetterOfCreditRepository.prototype.customVerb('getImportLetterOfCreditAmendments', params, onCompletion);
	};

	//For Operation 'createImportLC' with service id 'createLetterOfCredits6489'
	LetterOfCreditRepository.prototype.createImportLC = function(params, onCompletion){
		return LetterOfCreditRepository.prototype.customVerb('createImportLC', params, onCompletion);
	};

	//For Operation 'createImportLetterOfCreditAmendment' with service id 'createImportLetterOfCreditAmendment4791'
	LetterOfCreditRepository.prototype.createImportLetterOfCreditAmendment = function(params, onCompletion){
		return LetterOfCreditRepository.prototype.customVerb('createImportLetterOfCreditAmendment', params, onCompletion);
	};

	//For Operation 'getImportLetterOfCreditAmendmentsById' with service id 'getImportLetterOfCreditAmendmentsById5092'
	LetterOfCreditRepository.prototype.getImportLetterOfCreditAmendmentsById = function(params, onCompletion){
		return LetterOfCreditRepository.prototype.customVerb('getImportLetterOfCreditAmendmentsById', params, onCompletion);
	};

	//For Operation 'getLetterOfCreditsById' with service id 'getServiceRequestsByID5551'
	LetterOfCreditRepository.prototype.getLetterOfCreditsById = function(params, onCompletion){
		return LetterOfCreditRepository.prototype.customVerb('getLetterOfCreditsById', params, onCompletion);
	};

	//For Operation 'getSwiftCode' with service id 'getSwiftCode8796'
	LetterOfCreditRepository.prototype.getSwiftCode = function(params, onCompletion){
		return LetterOfCreditRepository.prototype.customVerb('getSwiftCode', params, onCompletion);
	};

	//For Operation 'getImportLCs' with service id 'getLetterOfCredits7427'
	LetterOfCreditRepository.prototype.getImportLCs = function(params, onCompletion){
		return LetterOfCreditRepository.prototype.customVerb('getImportLCs', params, onCompletion);
	};

	return LetterOfCreditRepository;
})