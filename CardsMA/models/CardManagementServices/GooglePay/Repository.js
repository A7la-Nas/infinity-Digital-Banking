define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function GooglePayRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	GooglePayRepository.prototype = Object.create(BaseRepository.prototype);
	GooglePayRepository.prototype.constructor = GooglePayRepository;

	//For Operation 'AddCard' with service id 'universalCardEnrollment4038'
	GooglePayRepository.prototype.AddCard = function(params, onCompletion){
		return GooglePayRepository.prototype.customVerb('AddCard', params, onCompletion);
	};

	return GooglePayRepository;
})