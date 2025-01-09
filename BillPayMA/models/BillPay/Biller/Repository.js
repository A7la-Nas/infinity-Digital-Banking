define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function BillerRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	BillerRepository.prototype = Object.create(BaseRepository.prototype);
	BillerRepository.prototype.constructor = BillerRepository;

	//For Operation 'searchBillerByName' with service id 'searchBillerByName4084'
	BillerRepository.prototype.searchBillerByName = function(params, onCompletion){
		return BillerRepository.prototype.customVerb('searchBillerByName', params, onCompletion);
	};

	return BillerRepository;
})