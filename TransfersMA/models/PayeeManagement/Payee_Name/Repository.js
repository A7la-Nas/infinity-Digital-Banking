define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function Payee_NameRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	Payee_NameRepository.prototype = Object.create(BaseRepository.prototype);
	Payee_NameRepository.prototype.constructor = Payee_NameRepository;

	//For Operation 'getPayeeName' with service id 'getBeneficiaryName9132'
	Payee_NameRepository.prototype.getPayeeName = function(params, onCompletion){
		return Payee_NameRepository.prototype.customVerb('getPayeeName', params, onCompletion);
	};

	return Payee_NameRepository;
})