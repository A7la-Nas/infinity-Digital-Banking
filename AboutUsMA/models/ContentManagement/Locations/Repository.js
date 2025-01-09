define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function LocationsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	LocationsRepository.prototype = Object.create(BaseRepository.prototype);
	LocationsRepository.prototype.constructor = LocationsRepository;

	//For Operation 'getList' with service id 'getLocationList8677'
	LocationsRepository.prototype.getList = function(params, onCompletion){
		return LocationsRepository.prototype.customVerb('getList', params, onCompletion);
	};

	//For Operation 'getRange' with service id 'getLocationRange4103'
	LocationsRepository.prototype.getRange = function(params, onCompletion){
		return LocationsRepository.prototype.customVerb('getRange', params, onCompletion);
	};

	//For Operation 'getAddressSuggestions' with service id 'getAddressSuggestions5942'
	LocationsRepository.prototype.getAddressSuggestions = function(params, onCompletion){
		return LocationsRepository.prototype.customVerb('getAddressSuggestions', params, onCompletion);
	};

	//For Operation 'getDetails' with service id 'getLocationDetails3188'
	LocationsRepository.prototype.getDetails = function(params, onCompletion){
		return LocationsRepository.prototype.customVerb('getDetails', params, onCompletion);
	};

	//For Operation 'getAddress' with service id 'GetLocationAddress6098'
	LocationsRepository.prototype.getAddress = function(params, onCompletion){
		return LocationsRepository.prototype.customVerb('getAddress', params, onCompletion);
	};

	//For Operation 'getQuery' with service id 'getSearchedLocations1286'
	LocationsRepository.prototype.getQuery = function(params, onCompletion){
		return LocationsRepository.prototype.customVerb('getQuery', params, onCompletion);
	};

	return LocationsRepository;
})