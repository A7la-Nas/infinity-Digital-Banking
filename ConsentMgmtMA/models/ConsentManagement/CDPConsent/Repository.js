define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function CDPConsentRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	CDPConsentRepository.prototype = Object.create(BaseRepository.prototype);
	CDPConsentRepository.prototype.constructor = CDPConsentRepository;

	//For Operation 'getConsent' with service id 'getCDPConsentGateway3152'
	CDPConsentRepository.prototype.getConsent = function(params, onCompletion){
		return CDPConsentRepository.prototype.customVerb('getConsent', params, onCompletion);
	};

	//For Operation 'updateConsent' with service id 'createOrder3271'
	CDPConsentRepository.prototype.updateConsent = function(params, onCompletion){
		return CDPConsentRepository.prototype.customVerb('updateConsent', params, onCompletion);
	};

	return CDPConsentRepository;
})