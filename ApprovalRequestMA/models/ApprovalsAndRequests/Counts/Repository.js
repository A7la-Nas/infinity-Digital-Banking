define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function CountsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	CountsRepository.prototype = Object.create(BaseRepository.prototype);
	CountsRepository.prototype.constructor = CountsRepository;

	//For Operation 'getCounts' with service id 'fetchApprovalRequestCounts1038'
	CountsRepository.prototype.getCounts = function(params, onCompletion){
		return CountsRepository.prototype.customVerb('getCounts', params, onCompletion);
	};

	return CountsRepository;
})