define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function LegalEntityRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	LegalEntityRepository.prototype = Object.create(BaseRepository.prototype);
	LegalEntityRepository.prototype.constructor = LegalEntityRepository;

	//For Operation 'getLegalEntities' with service id 'GetLegalEntities6016'
	LegalEntityRepository.prototype.getLegalEntities = function(params, onCompletion){
		return LegalEntityRepository.prototype.customVerb('getLegalEntities', params, onCompletion);
	};

	return LegalEntityRepository;
})