define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function SamsungPayRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	SamsungPayRepository.prototype = Object.create(BaseRepository.prototype);
	SamsungPayRepository.prototype.constructor = SamsungPayRepository;

	//For Operation 'AddCard' with service id 'universalCardEnrollment2292'
	SamsungPayRepository.prototype.AddCard = function(params, onCompletion){
		return SamsungPayRepository.prototype.customVerb('AddCard', params, onCompletion);
	};

	return SamsungPayRepository;
})