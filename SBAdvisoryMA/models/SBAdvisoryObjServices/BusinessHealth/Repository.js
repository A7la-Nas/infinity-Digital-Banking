define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function BusinessHealthRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	BusinessHealthRepository.prototype = Object.create(BaseRepository.prototype);
	BusinessHealthRepository.prototype.constructor = BusinessHealthRepository;

	//For Operation 'getScoreAndDrivers' with service id 'GetBusinessHealthScoreAndDrivers5092'
	BusinessHealthRepository.prototype.getScoreAndDrivers = function(params, onCompletion){
		return BusinessHealthRepository.prototype.customVerb('getScoreAndDrivers', params, onCompletion);
	};

	return BusinessHealthRepository;
})