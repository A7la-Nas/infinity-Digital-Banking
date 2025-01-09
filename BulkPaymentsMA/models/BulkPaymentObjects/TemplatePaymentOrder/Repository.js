define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function TemplatePaymentOrderRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	TemplatePaymentOrderRepository.prototype = Object.create(BaseRepository.prototype);
	TemplatePaymentOrderRepository.prototype.constructor = TemplatePaymentOrderRepository;

	//For Operation 'fetchBulkPaymentTemplatePOsById' with service id 'fetchBulkPaymentTemplatePOById6367'
	TemplatePaymentOrderRepository.prototype.fetchBulkPaymentTemplatePOsById = function(params, onCompletion){
		return TemplatePaymentOrderRepository.prototype.customVerb('fetchBulkPaymentTemplatePOsById', params, onCompletion);
	};

	return TemplatePaymentOrderRepository;
})