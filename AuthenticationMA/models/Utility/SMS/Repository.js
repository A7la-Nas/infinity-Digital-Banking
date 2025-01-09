define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function SMSRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	SMSRepository.prototype = Object.create(BaseRepository.prototype);
	SMSRepository.prototype.constructor = SMSRepository;

	//For Operation 'smsOTP' with service id 'smsOTP7625'
	SMSRepository.prototype.smsOTP = function(params, onCompletion){
		return SMSRepository.prototype.customVerb('smsOTP', params, onCompletion);
	};

	//For Operation 'sendKMSSMS' with service id 'sendSMS5810'
	SMSRepository.prototype.sendKMSSMS = function(params, onCompletion){
		return SMSRepository.prototype.customVerb('sendKMSSMS', params, onCompletion);
	};

	return SMSRepository;
})