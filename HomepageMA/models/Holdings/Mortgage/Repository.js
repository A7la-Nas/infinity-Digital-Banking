define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function MortgageRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	MortgageRepository.prototype = Object.create(BaseRepository.prototype);
	MortgageRepository.prototype.constructor = MortgageRepository;

	//For Operation 'getMortgageDrawings' with service id 'getMortgageDrawings5215'
	MortgageRepository.prototype.getMortgageDrawings = function(params, onCompletion){
		return MortgageRepository.prototype.customVerb('getMortgageDrawings', params, onCompletion);
	};

	//For Operation 'getMortgageFacilityDetails' with service id 'getMortgageFacilites9848'
	MortgageRepository.prototype.getMortgageFacilityDetails = function(params, onCompletion){
		return MortgageRepository.prototype.customVerb('getMortgageFacilityDetails', params, onCompletion);
	};

	return MortgageRepository;
})