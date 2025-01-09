define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function CreditCardRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	CreditCardRepository.prototype = Object.create(BaseRepository.prototype);
	CreditCardRepository.prototype.constructor = CreditCardRepository;

	//For Operation 'getCreditCardAccounts' with service id 'getCreditCardAccounts8449'
	CreditCardRepository.prototype.getCreditCardAccounts = function(params, onCompletion){
		return CreditCardRepository.prototype.customVerb('getCreditCardAccounts', params, onCompletion);
	};

	//For Operation 'createCreditCardTransfer' with service id 'createCreditCardTransfer7559'
	CreditCardRepository.prototype.createCreditCardTransfer = function(params, onCompletion){
		return CreditCardRepository.prototype.customVerb('createCreditCardTransfer', params, onCompletion);
	};

	return CreditCardRepository;
})