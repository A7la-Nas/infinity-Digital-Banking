define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function TrackDeviceRegistrationRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	TrackDeviceRegistrationRepository.prototype = Object.create(BaseRepository.prototype);
	TrackDeviceRegistrationRepository.prototype.constructor = TrackDeviceRegistrationRepository;

	//For Operation 'trackDeviceRegistration' with service id 'trackRegisterCustomerDevice4571'
	TrackDeviceRegistrationRepository.prototype.trackDeviceRegistration = function(params, onCompletion){
		return TrackDeviceRegistrationRepository.prototype.customVerb('trackDeviceRegistration', params, onCompletion);
	};

	return TrackDeviceRegistrationRepository;
})