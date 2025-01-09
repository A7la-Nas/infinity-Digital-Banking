define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ProgrammesRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ProgrammesRepository.prototype = Object.create(BaseRepository.prototype);
	ProgrammesRepository.prototype.constructor = ProgrammesRepository;

	//For Operation 'getListOfProgrammes' with service id 'GetProgrammes2327'
	ProgrammesRepository.prototype.getListOfProgrammes = function(params, onCompletion){
		return ProgrammesRepository.prototype.customVerb('getListOfProgrammes', params, onCompletion);
	};

	return ProgrammesRepository;
})