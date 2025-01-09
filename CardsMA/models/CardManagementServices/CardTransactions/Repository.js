define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function CardTransactionsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	CardTransactionsRepository.prototype = Object.create(BaseRepository.prototype);
	CardTransactionsRepository.prototype.constructor = CardTransactionsRepository;

	//For Operation 'getCardTransactions' with service id 'getCardTransactions4669'
	CardTransactionsRepository.prototype.getCardTransactions = function(params, onCompletion){
		return CardTransactionsRepository.prototype.customVerb('getCardTransactions', params, onCompletion);
	};

	return CardTransactionsRepository;
})