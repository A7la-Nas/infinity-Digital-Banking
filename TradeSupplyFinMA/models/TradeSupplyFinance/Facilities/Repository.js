define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function FacilitiesRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	FacilitiesRepository.prototype = Object.create(BaseRepository.prototype);
	FacilitiesRepository.prototype.constructor = FacilitiesRepository;

	//For Operation 'getListOfFacilities' with service id 'GetFacilities9403'
	FacilitiesRepository.prototype.getListOfFacilities = function(params, onCompletion){
		return FacilitiesRepository.prototype.customVerb('getListOfFacilities', params, onCompletion);
	};

	return FacilitiesRepository;
})