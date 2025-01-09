define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function CardStatementsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	CardStatementsRepository.prototype = Object.create(BaseRepository.prototype);
	CardStatementsRepository.prototype.constructor = CardStatementsRepository;

	//For Operation 'getCardStatements' with service id 'getCardStatementsOperation7272'
	CardStatementsRepository.prototype.getCardStatements = function(params, onCompletion){
		return CardStatementsRepository.prototype.customVerb('getCardStatements', params, onCompletion);
	};

	return CardStatementsRepository;
})