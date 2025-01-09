define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function InformationRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	InformationRepository.prototype = Object.create(BaseRepository.prototype);
	InformationRepository.prototype.constructor = InformationRepository;

	//For Operation 'getContactUs' with service id 'getContactUs2111'
	InformationRepository.prototype.getContactUs = function(params, onCompletion){
		return InformationRepository.prototype.customVerb('getContactUs', params, onCompletion);
	};

	//For Operation 'getPrivacyPolicy' with service id 'getPrivacyPolicy8800'
	InformationRepository.prototype.getPrivacyPolicy = function(params, onCompletion){
		return InformationRepository.prototype.customVerb('getPrivacyPolicy', params, onCompletion);
	};

	//For Operation 'getFAQs' with service id 'getFAQs7120'
	InformationRepository.prototype.getFAQs = function(params, onCompletion){
		return InformationRepository.prototype.customVerb('getFAQs', params, onCompletion);
	};

	return InformationRepository;
})