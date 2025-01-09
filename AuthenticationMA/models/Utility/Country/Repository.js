define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function CountryRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	CountryRepository.prototype = Object.create(BaseRepository.prototype);
	CountryRepository.prototype.constructor = CountryRepository;

	//For Operation 'getAllCountries' with service id 'getAllCountries5715'
	CountryRepository.prototype.getAllCountries = function(params, onCompletion){
		return CountryRepository.prototype.customVerb('getAllCountries', params, onCompletion);
	};

	//For Operation 'getCountryCodes' with service id 'GetCountryCodes6671'
	CountryRepository.prototype.getCountryCodes = function(params, onCompletion){
		return CountryRepository.prototype.customVerb('getCountryCodes', params, onCompletion);
	};

	return CountryRepository;
})