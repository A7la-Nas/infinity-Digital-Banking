define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function CustomerAdviceRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	CustomerAdviceRepository.prototype = Object.create(BaseRepository.prototype);
	CustomerAdviceRepository.prototype.constructor = CustomerAdviceRepository;

	//For Operation 'generate' with service id 'retrieveAttachments4400'
	CustomerAdviceRepository.prototype.generate = function(params, onCompletion){
		return CustomerAdviceRepository.prototype.customVerb('generate', params, onCompletion);
	};

	return CustomerAdviceRepository;
})