define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function DeviceRegistrationRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	DeviceRegistrationRepository.prototype = Object.create(BaseRepository.prototype);
	DeviceRegistrationRepository.prototype.constructor = DeviceRegistrationRepository;

	//For Operation 'customCreate' with service id 'registerDevice9986'
	DeviceRegistrationRepository.prototype.customCreate = function(params, onCompletion){
		return DeviceRegistrationRepository.prototype.customVerb('customCreate', params, onCompletion);
	};

	//For Operation 'dbx_updateCustomerDeviceInfo' with service id 'UpdateCustomerDeviceInformation7178'
	DeviceRegistrationRepository.prototype.dbx_updateCustomerDeviceInfo = function(params, onCompletion){
		return DeviceRegistrationRepository.prototype.customVerb('dbx_updateCustomerDeviceInfo', params, onCompletion);
	};

	//For Operation 'dbx_registerCustomerDevice' with service id 'RegisterCustomerDevice7303'
	DeviceRegistrationRepository.prototype.dbx_registerCustomerDevice = function(params, onCompletion){
		return DeviceRegistrationRepository.prototype.customVerb('dbx_registerCustomerDevice', params, onCompletion);
	};

	//For Operation 'dbx_isDeviceRegistered' with service id 'IsDeviceRegistered4163'
	DeviceRegistrationRepository.prototype.dbx_isDeviceRegistered = function(params, onCompletion){
		return DeviceRegistrationRepository.prototype.customVerb('dbx_isDeviceRegistered', params, onCompletion);
	};

	return DeviceRegistrationRepository;
})