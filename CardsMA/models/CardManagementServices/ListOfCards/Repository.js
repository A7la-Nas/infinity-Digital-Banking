define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ListOfCardsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ListOfCardsRepository.prototype = Object.create(BaseRepository.prototype);
	ListOfCardsRepository.prototype.constructor = ListOfCardsRepository;

	//For Operation 'getActiveCards' with service id 'getActiveCards8542'
	ListOfCardsRepository.prototype.getActiveCards = function(params, onCompletion){
		return ListOfCardsRepository.prototype.customVerb('getActiveCards', params, onCompletion);
	};

	return ListOfCardsRepository;
})