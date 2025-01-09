define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function TradeFinanceMessagesRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	TradeFinanceMessagesRepository.prototype = Object.create(BaseRepository.prototype);
	TradeFinanceMessagesRepository.prototype.constructor = TradeFinanceMessagesRepository;

	//For Operation 'createRequest' with service id 'CreateRequest1305'
	TradeFinanceMessagesRepository.prototype.createRequest = function(params, onCompletion){
		return TradeFinanceMessagesRepository.prototype.customVerb('createRequest', params, onCompletion);
	};

	return TradeFinanceMessagesRepository;
})