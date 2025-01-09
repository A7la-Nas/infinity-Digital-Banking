define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function PFMTransactionsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	PFMTransactionsRepository.prototype = Object.create(BaseRepository.prototype);
	PFMTransactionsRepository.prototype.constructor = PFMTransactionsRepository;

	//For Operation 'updateBulkPFMTransaction' with service id 'updateBulkPFMTransaction5063'
	PFMTransactionsRepository.prototype.updateBulkPFMTransaction = function(params, onCompletion){
		return PFMTransactionsRepository.prototype.customVerb('updateBulkPFMTransaction', params, onCompletion);
	};

	return PFMTransactionsRepository;
})