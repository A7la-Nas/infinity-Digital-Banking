define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function CardIssuerRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	CardIssuerRepository.prototype = Object.create(BaseRepository.prototype);
	CardIssuerRepository.prototype.constructor = CardIssuerRepository;

	//For Operation 'EnrollWithIssuer' with service id 'enrollCard7689'
	CardIssuerRepository.prototype.EnrollWithIssuer = function(params, onCompletion){
		return CardIssuerRepository.prototype.customVerb('EnrollWithIssuer', params, onCompletion);
	};

	return CardIssuerRepository;
})