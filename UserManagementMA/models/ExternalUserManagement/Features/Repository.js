define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function FeaturesRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	FeaturesRepository.prototype = Object.create(BaseRepository.prototype);
	FeaturesRepository.prototype.constructor = FeaturesRepository;

	//For Operation 'getAccessPolicies' with service id 'getAccessPolicies4424'
	FeaturesRepository.prototype.getAccessPolicies = function(params, onCompletion){
		return FeaturesRepository.prototype.customVerb('getAccessPolicies', params, onCompletion);
	};

	return FeaturesRepository;
})