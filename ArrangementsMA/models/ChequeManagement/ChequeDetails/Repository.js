define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ChequeDetailsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ChequeDetailsRepository.prototype = Object.create(BaseRepository.prototype);
	ChequeDetailsRepository.prototype.constructor = ChequeDetailsRepository;

	//For Operation 'getDetails' with service id 'getChequeSupplements6401'
	ChequeDetailsRepository.prototype.getDetails = function(params, onCompletion){
		return ChequeDetailsRepository.prototype.customVerb('getDetails', params, onCompletion);
	};

	return ChequeDetailsRepository;
})