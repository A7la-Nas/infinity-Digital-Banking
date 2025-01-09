define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function PayeeRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	PayeeRepository.prototype = Object.create(BaseRepository.prototype);
	PayeeRepository.prototype.constructor = PayeeRepository;

	//For Operation 'editPayee' with service id 'editPayee5329'
	PayeeRepository.prototype.editPayee = function(params, onCompletion){
		return PayeeRepository.prototype.customVerb('editPayee', params, onCompletion);
	};

	//For Operation 'createCorporatePayee' with service id 'createCorporatePayee1242'
	PayeeRepository.prototype.createCorporatePayee = function(params, onCompletion){
		return PayeeRepository.prototype.customVerb('createCorporatePayee', params, onCompletion);
	};

	//For Operation 'getCorporatePayees' with service id 'getCorporatePayees5233'
	PayeeRepository.prototype.getCorporatePayees = function(params, onCompletion){
		return PayeeRepository.prototype.customVerb('getCorporatePayees', params, onCompletion);
	};

	return PayeeRepository;
})