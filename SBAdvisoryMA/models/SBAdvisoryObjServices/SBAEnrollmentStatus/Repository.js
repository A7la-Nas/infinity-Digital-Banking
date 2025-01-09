define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function SBAEnrollmentStatusRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	SBAEnrollmentStatusRepository.prototype = Object.create(BaseRepository.prototype);
	SBAEnrollmentStatusRepository.prototype.constructor = SBAEnrollmentStatusRepository;

	//For Operation 'getSBAEnrolmentStatus' with service id 'getSBAEnrolmentStatus1609'
	SBAEnrollmentStatusRepository.prototype.getSBAEnrolmentStatus = function(params, onCompletion){
		return SBAEnrollmentStatusRepository.prototype.customVerb('getSBAEnrolmentStatus', params, onCompletion);
	};

	//For Operation 'updateSBAStatus' with service id 'updateSBAStatus2854'
	SBAEnrollmentStatusRepository.prototype.updateSBAStatus = function(params, onCompletion){
		return SBAEnrollmentStatusRepository.prototype.customVerb('updateSBAStatus', params, onCompletion);
	};

	return SBAEnrollmentStatusRepository;
})