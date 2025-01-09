define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function StandingInstructionRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	StandingInstructionRepository.prototype = Object.create(BaseRepository.prototype);
	StandingInstructionRepository.prototype.constructor = StandingInstructionRepository;

	//For Operation 'getInstructions' with service id 'GetStandingInstructions7279'
	StandingInstructionRepository.prototype.getInstructions = function(params, onCompletion){
		return StandingInstructionRepository.prototype.customVerb('getInstructions', params, onCompletion);
	};

	return StandingInstructionRepository;
})