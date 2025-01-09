define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function PayeesRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	PayeesRepository.prototype = Object.create(BaseRepository.prototype);
	PayeesRepository.prototype.constructor = PayeesRepository;

	//For Operation 'getIntraInterBankPayee' with service id 'getIntraInterBankPayee2558'
	PayeesRepository.prototype.getIntraInterBankPayee = function(params, onCompletion){
		return PayeesRepository.prototype.customVerb('getIntraInterBankPayee', params, onCompletion);
	};

	//For Operation 'createPayee' with service id 'createExternalPayee8253'
	PayeesRepository.prototype.createPayee = function(params, onCompletion){
		return PayeesRepository.prototype.customVerb('createPayee', params, onCompletion);
	};

	//For Operation 'getPayees' with service id 'getExternalPayees8900'
	PayeesRepository.prototype.getPayees = function(params, onCompletion){
		return PayeesRepository.prototype.customVerb('getPayees', params, onCompletion);
	};

	//For Operation 'editPayee' with service id 'editExternalPayee5746'
	PayeesRepository.prototype.editPayee = function(params, onCompletion){
		return PayeesRepository.prototype.customVerb('editPayee', params, onCompletion);
	};

	//For Operation 'deletePayee' with service id 'deleteExternalPayee1481'
	PayeesRepository.prototype.deletePayee = function(params, onCompletion){
		return PayeesRepository.prototype.customVerb('deletePayee', params, onCompletion);
	};

	return PayeesRepository;
})