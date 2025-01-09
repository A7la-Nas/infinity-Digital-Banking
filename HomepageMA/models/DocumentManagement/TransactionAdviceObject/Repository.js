define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function TransactionAdviceObjectRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	TransactionAdviceObjectRepository.prototype = Object.create(BaseRepository.prototype);
	TransactionAdviceObjectRepository.prototype.constructor = TransactionAdviceObjectRepository;

	//For Operation 'getBase64' with service id 'loginAndView8466'
	TransactionAdviceObjectRepository.prototype.getBase64 = function(params, onCompletion){
		return TransactionAdviceObjectRepository.prototype.customVerb('getBase64', params, onCompletion);
	};

	return TransactionAdviceObjectRepository;
})