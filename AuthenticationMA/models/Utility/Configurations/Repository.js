define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ConfigurationsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ConfigurationsRepository.prototype = Object.create(BaseRepository.prototype);
	ConfigurationsRepository.prototype.constructor = ConfigurationsRepository;

	//For Operation 'getSystemConfigurations' with service id 'GetConfigurations9010'
	ConfigurationsRepository.prototype.getSystemConfigurations = function(params, onCompletion){
		return ConfigurationsRepository.prototype.customVerb('getSystemConfigurations', params, onCompletion);
	};

	return ConfigurationsRepository;
})