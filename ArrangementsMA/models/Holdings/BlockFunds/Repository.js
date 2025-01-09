define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function BlockFundsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	BlockFundsRepository.prototype = Object.create(BaseRepository.prototype);
	BlockFundsRepository.prototype.constructor = BlockFundsRepository;

	//For Operation 'getList' with service id 'getBlockedFunds5312'
	BlockFundsRepository.prototype.getList = function(params, onCompletion){
		return BlockFundsRepository.prototype.customVerb('getList', params, onCompletion);
	};

	return BlockFundsRepository;
})