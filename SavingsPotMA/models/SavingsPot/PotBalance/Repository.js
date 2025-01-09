define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function PotBalanceRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	PotBalanceRepository.prototype = Object.create(BaseRepository.prototype);
	PotBalanceRepository.prototype.constructor = PotBalanceRepository;

	//For Operation 'updateBalance' with service id 'updateSavingsPotBalance8223'
	PotBalanceRepository.prototype.updateBalance = function(params, onCompletion){
		return PotBalanceRepository.prototype.customVerb('updateBalance', params, onCompletion);
	};

	return PotBalanceRepository;
})