define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ApplePayRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ApplePayRepository.prototype = Object.create(BaseRepository.prototype);
	ApplePayRepository.prototype.constructor = ApplePayRepository;

	//For Operation 'AddCard' with service id 'linkCardWithPaymentService7572'
	ApplePayRepository.prototype.AddCard = function(params, onCompletion){
		return ApplePayRepository.prototype.customVerb('AddCard', params, onCompletion);
	};

	return ApplePayRepository;
})