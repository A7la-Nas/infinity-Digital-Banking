define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function PotCategoriesRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	PotCategoriesRepository.prototype = Object.create(BaseRepository.prototype);
	PotCategoriesRepository.prototype.constructor = PotCategoriesRepository;

	//For Operation 'getCategories' with service id 'getCategoriesForGoal1367'
	PotCategoriesRepository.prototype.getCategories = function(params, onCompletion){
		return PotCategoriesRepository.prototype.customVerb('getCategories', params, onCompletion);
	};

	return PotCategoriesRepository;
})