define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function DeviceRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	DeviceRepository.prototype = Object.create(BaseRepository.prototype);
	DeviceRepository.prototype.constructor = DeviceRepository;

	//For Operation 'registerNewDevice' with service id 'registerNewDevice9291'
	DeviceRepository.prototype.registerNewDevice = function(params, onCompletion){
		return DeviceRepository.prototype.customVerb('registerNewDevice', params, onCompletion);
	};

	//For Operation 'updateUserDeviceStatus' with service id 'updateUserDeviceStatus6309'
	DeviceRepository.prototype.updateUserDeviceStatus = function(params, onCompletion){
		return DeviceRepository.prototype.customVerb('updateUserDeviceStatus', params, onCompletion);
	};

	//For Operation 'fetch' with service id 'searchUser3702'
	DeviceRepository.prototype.fetch = function(params, onCompletion){
		return DeviceRepository.prototype.customVerb('fetch', params, onCompletion);
	};

	//For Operation 'updateMyDeviceStatus' with service id 'updateMyDeviceStatus5412'
	DeviceRepository.prototype.updateMyDeviceStatus = function(params, onCompletion){
		return DeviceRepository.prototype.customVerb('updateMyDeviceStatus', params, onCompletion);
	};

	//For Operation 'revokeMyDevice' with service id 'revokeMyDevice5587'
	DeviceRepository.prototype.revokeMyDevice = function(params, onCompletion){
		return DeviceRepository.prototype.customVerb('revokeMyDevice', params, onCompletion);
	};

	//For Operation 'getMyDevices' with service id 'getMyDevices4037'
	DeviceRepository.prototype.getMyDevices = function(params, onCompletion){
		return DeviceRepository.prototype.customVerb('getMyDevices', params, onCompletion);
	};

	//For Operation 'getUserDevices' with service id 'getUserDevices8825'
	DeviceRepository.prototype.getUserDevices = function(params, onCompletion){
		return DeviceRepository.prototype.customVerb('getUserDevices', params, onCompletion);
	};

	//For Operation 'revokeUserDevice' with service id 'revokeUserDevice6920'
	DeviceRepository.prototype.revokeUserDevice = function(params, onCompletion){
		return DeviceRepository.prototype.customVerb('revokeUserDevice', params, onCompletion);
	};

	return DeviceRepository;
})