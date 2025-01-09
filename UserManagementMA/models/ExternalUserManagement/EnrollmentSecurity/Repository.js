define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function EnrollmentSecurityRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	EnrollmentSecurityRepository.prototype = Object.create(BaseRepository.prototype);
	EnrollmentSecurityRepository.prototype.constructor = EnrollmentSecurityRepository;

	//For Operation 'generateCaptchaForEnrollment' with service id 'GenerateCaptchaForEnrollment7181'
	EnrollmentSecurityRepository.prototype.generateCaptchaForEnrollment = function(params, onCompletion){
		return EnrollmentSecurityRepository.prototype.customVerb('generateCaptchaForEnrollment', params, onCompletion);
	};

	return EnrollmentSecurityRepository;
})