define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function StatesRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	StatesRepository.prototype = Object.create(BaseRepository.prototype);
	StatesRepository.prototype.constructor = StatesRepository;

	//For Operation 'getAllRegions' with service id 'getAllRegions2852'
	StatesRepository.prototype.getAllRegions = function(params, onCompletion){
		return StatesRepository.prototype.customVerb('getAllRegions', params, onCompletion);
	};

	//For Operation 'getRegionDetails' with service id 'getRegionDetails3652'
	StatesRepository.prototype.getRegionDetails = function(params, onCompletion){
		return StatesRepository.prototype.customVerb('getRegionDetails', params, onCompletion);
	};

	//For Operation 'getAllCities' with service id 'getAllCities8356'
	StatesRepository.prototype.getAllCities = function(params, onCompletion){
		return StatesRepository.prototype.customVerb('getAllCities', params, onCompletion);
	};

	return StatesRepository;
})