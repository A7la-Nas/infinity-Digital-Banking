define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function CustomerAdvice_BillPayRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	CustomerAdvice_BillPayRepository.prototype = Object.create(BaseRepository.prototype);
	CustomerAdvice_BillPayRepository.prototype.constructor = CustomerAdvice_BillPayRepository;

	//For Operation 'generate' with service id 'GenerateTransactionReport2120'
	CustomerAdvice_BillPayRepository.prototype.generate = function(params, onCompletion){
		return CustomerAdvice_BillPayRepository.prototype.customVerb('generate', params, onCompletion);
	};

	return CustomerAdvice_BillPayRepository;
})