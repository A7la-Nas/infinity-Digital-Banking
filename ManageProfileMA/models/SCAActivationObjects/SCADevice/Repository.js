define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function SCADeviceRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	SCADeviceRepository.prototype = Object.create(BaseRepository.prototype);
	SCADeviceRepository.prototype.constructor = SCADeviceRepository;

	//For Operation 'lostDevice' with service id 'validateLostDevice3437'
	SCADeviceRepository.prototype.lostDevice = function(params, onCompletion){
		return SCADeviceRepository.prototype.customVerb('lostDevice', params, onCompletion);
	};

	return SCADeviceRepository;
})