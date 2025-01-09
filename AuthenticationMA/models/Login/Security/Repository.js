define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function SecurityRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	SecurityRepository.prototype = Object.create(BaseRepository.prototype);
	SecurityRepository.prototype.constructor = SecurityRepository;

	//For Operation 'generateCaptcha' with service id 'GenerateCaptcha7112'
	SecurityRepository.prototype.generateCaptcha = function(params, onCompletion){
		return SecurityRepository.prototype.customVerb('generateCaptcha', params, onCompletion);
	};

	//For Operation 'verifyCaptcha' with service id 'VerifyCaptcha1364'
	SecurityRepository.prototype.verifyCaptcha = function(params, onCompletion){
		return SecurityRepository.prototype.customVerb('verifyCaptcha', params, onCompletion);
	};

	return SecurityRepository;
})