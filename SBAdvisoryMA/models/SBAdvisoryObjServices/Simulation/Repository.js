define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function SimulationRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	SimulationRepository.prototype = Object.create(BaseRepository.prototype);
	SimulationRepository.prototype.constructor = SimulationRepository;

	//For Operation 'updateDetails' with service id 'getSimulation9567'
	SimulationRepository.prototype.updateDetails = function(params, onCompletion){
		return SimulationRepository.prototype.customVerb('updateDetails', params, onCompletion);
	};

	return SimulationRepository;
})