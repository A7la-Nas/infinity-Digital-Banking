define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function PotRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	PotRepository.prototype = Object.create(BaseRepository.prototype);
	PotRepository.prototype.constructor = PotRepository;

	//For Operation 'createPot' with service id 'createSavingsPot7507'
	PotRepository.prototype.createPot = function(params, onCompletion){
		return PotRepository.prototype.customVerb('createPot', params, onCompletion);
	};

	//For Operation 'getPot' with service id 'getAllSavingsPot3916'
	PotRepository.prototype.getPot = function(params, onCompletion){
		return PotRepository.prototype.customVerb('getPot', params, onCompletion);
	};

	//For Operation 'updatePot' with service id 'updateSavingsPot9306'
	PotRepository.prototype.updatePot = function(params, onCompletion){
		return PotRepository.prototype.customVerb('updatePot', params, onCompletion);
	};

	//For Operation 'closePot' with service id 'closeSavingsPot2736'
	PotRepository.prototype.closePot = function(params, onCompletion){
		return PotRepository.prototype.customVerb('closePot', params, onCompletion);
	};

	return PotRepository;
})