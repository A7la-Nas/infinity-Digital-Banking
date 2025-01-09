define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function DirectDebitsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	DirectDebitsRepository.prototype = Object.create(BaseRepository.prototype);
	DirectDebitsRepository.prototype.constructor = DirectDebitsRepository;

	//For Operation 'getDirectDebits' with service id 'getDirectDebits1225'
	DirectDebitsRepository.prototype.getDirectDebits = function(params, onCompletion){
		return DirectDebitsRepository.prototype.customVerb('getDirectDebits', params, onCompletion);
	};

	//For Operation 'stopNextPayment' with service id 'stopNextPayment2884'
	DirectDebitsRepository.prototype.stopNextPayment = function(params, onCompletion){
		return DirectDebitsRepository.prototype.customVerb('stopNextPayment', params, onCompletion);
	};

	//For Operation 'cancelDirectDebit' with service id 'cancelDirectDebit1126'
	DirectDebitsRepository.prototype.cancelDirectDebit = function(params, onCompletion){
		return DirectDebitsRepository.prototype.customVerb('cancelDirectDebit', params, onCompletion);
	};

	return DirectDebitsRepository;
})