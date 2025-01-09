define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function RolloverRequestsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	RolloverRequestsRepository.prototype = Object.create(BaseRepository.prototype);
	RolloverRequestsRepository.prototype.constructor = RolloverRequestsRepository;

	//For Operation 'submit' with service id 'SubmitRolloverRequestOperation9000'
	RolloverRequestsRepository.prototype.submit = function(params, onCompletion){
		return RolloverRequestsRepository.prototype.customVerb('submit', params, onCompletion);
	};

	return RolloverRequestsRepository;
})