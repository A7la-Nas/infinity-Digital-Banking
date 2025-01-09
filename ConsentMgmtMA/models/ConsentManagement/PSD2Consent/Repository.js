define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function PSD2ConsentRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	PSD2ConsentRepository.prototype = Object.create(BaseRepository.prototype);
	PSD2ConsentRepository.prototype.constructor = PSD2ConsentRepository;

	//For Operation 'getConsent' with service id 'getPSDConsentGateway4428'
	PSD2ConsentRepository.prototype.getConsent = function(params, onCompletion){
		return PSD2ConsentRepository.prototype.customVerb('getConsent', params, onCompletion);
	};

	//For Operation 'updateConsent' with service id 'createOrder3951'
	PSD2ConsentRepository.prototype.updateConsent = function(params, onCompletion){
		return PSD2ConsentRepository.prototype.customVerb('updateConsent', params, onCompletion);
	};

	return PSD2ConsentRepository;
})