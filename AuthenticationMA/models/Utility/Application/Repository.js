define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ApplicationRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ApplicationRepository.prototype = Object.create(BaseRepository.prototype);
	ApplicationRepository.prototype.constructor = ApplicationRepository;

	//For Operation 'getServerTimeZoneOffset' with service id 'getServerTimeZoneOffset6081'
	ApplicationRepository.prototype.getServerTimeZoneOffset = function(params, onCompletion){
		return ApplicationRepository.prototype.customVerb('getServerTimeZoneOffset', params, onCompletion);
	};

	return ApplicationRepository;
})