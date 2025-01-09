define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function EnrollmentRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	EnrollmentRepository.prototype = Object.create(BaseRepository.prototype);
	EnrollmentRepository.prototype.constructor = EnrollmentRepository;

	//For Operation 'getSBAFeaturesActions' with service id 'getSBAFeaturesActions8370'
	EnrollmentRepository.prototype.getSBAFeaturesActions = function(params, onCompletion){
		return EnrollmentRepository.prototype.customVerb('getSBAFeaturesActions', params, onCompletion);
	};

	//For Operation 'startProcess' with service id 'startProcess2660'
	EnrollmentRepository.prototype.startProcess = function(params, onCompletion){
		return EnrollmentRepository.prototype.customVerb('startProcess', params, onCompletion);
	};

	//For Operation 'getStatus' with service id 'getEnrollmentStatus6704'
	EnrollmentRepository.prototype.getStatus = function(params, onCompletion){
		return EnrollmentRepository.prototype.customVerb('getStatus', params, onCompletion);
	};

	//For Operation 'getAccountingData' with service id 'getAccountingData4257'
	EnrollmentRepository.prototype.getAccountingData = function(params, onCompletion){
		return EnrollmentRepository.prototype.customVerb('getAccountingData', params, onCompletion);
	};

	return EnrollmentRepository;
})