define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ChangePINRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ChangePINRepository.prototype = Object.create(BaseRepository.prototype);
	ChangePINRepository.prototype.constructor = ChangePINRepository;

	//For Operation 'createRequest' with service id 'createOrder8163'
	ChangePINRepository.prototype.createRequest = function(params, onCompletion){
		return ChangePINRepository.prototype.customVerb('createRequest', params, onCompletion);
	};

	//For Operation 'updateCreditCardPin' with service id 'createCardRequest1362'
	ChangePINRepository.prototype.updateCreditCardPin = function(params, onCompletion){
		return ChangePINRepository.prototype.customVerb('updateCreditCardPin', params, onCompletion);
	};

	return ChangePINRepository;
})