define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function UpcomingTransactionsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	UpcomingTransactionsRepository.prototype = Object.create(BaseRepository.prototype);
	UpcomingTransactionsRepository.prototype.constructor = UpcomingTransactionsRepository;

	//For Operation 'getScheduledTransactions' with service id 'GetUpcomingTransactions2394'
	UpcomingTransactionsRepository.prototype.getScheduledTransactions = function(params, onCompletion){
		return UpcomingTransactionsRepository.prototype.customVerb('getScheduledTransactions', params, onCompletion);
	};

	return UpcomingTransactionsRepository;
})