define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function EmailRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	EmailRepository.prototype = Object.create(BaseRepository.prototype);
	EmailRepository.prototype.constructor = EmailRepository;

	//For Operation 'sendKMSEmail' with service id 'sendEmail1885'
	EmailRepository.prototype.sendKMSEmail = function(params, onCompletion){
		return EmailRepository.prototype.customVerb('sendKMSEmail', params, onCompletion);
	};

	return EmailRepository;
})