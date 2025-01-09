define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function CustomerFeedbackRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	CustomerFeedbackRepository.prototype = Object.create(BaseRepository.prototype);
	CustomerFeedbackRepository.prototype.constructor = CustomerFeedbackRepository;

	//For Operation 'createFeedback' with service id 'createCustomerFeedback3251'
	CustomerFeedbackRepository.prototype.createFeedback = function(params, onCompletion){
		return CustomerFeedbackRepository.prototype.customVerb('createFeedback', params, onCompletion);
	};

	return CustomerFeedbackRepository;
})