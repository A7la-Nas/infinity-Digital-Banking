define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function BulkPaymentTemplateRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	BulkPaymentTemplateRepository.prototype = Object.create(BaseRepository.prototype);
	BulkPaymentTemplateRepository.prototype.constructor = BulkPaymentTemplateRepository;

	//For Operation 'createBulkRequest' with service id 'createBulkRequest7131'
	BulkPaymentTemplateRepository.prototype.createBulkRequest = function(params, onCompletion){
		return BulkPaymentTemplateRepository.prototype.customVerb('createBulkRequest', params, onCompletion);
	};

	//For Operation 'fetchBulkPaymentTemplates' with service id 'fetchBulkPaymentTemplates7440'
	BulkPaymentTemplateRepository.prototype.fetchBulkPaymentTemplates = function(params, onCompletion){
		return BulkPaymentTemplateRepository.prototype.customVerb('fetchBulkPaymentTemplates', params, onCompletion);
	};

	//For Operation 'editBulkPaymentTemplate' with service id 'editBulkPaymentTemplate2220'
	BulkPaymentTemplateRepository.prototype.editBulkPaymentTemplate = function(params, onCompletion){
		return BulkPaymentTemplateRepository.prototype.customVerb('editBulkPaymentTemplate', params, onCompletion);
	};

	//For Operation 'fetchBulkPaymentTemplateById' with service id 'fetchBulkPaymentTemplateById8633'
	BulkPaymentTemplateRepository.prototype.fetchBulkPaymentTemplateById = function(params, onCompletion){
		return BulkPaymentTemplateRepository.prototype.customVerb('fetchBulkPaymentTemplateById', params, onCompletion);
	};

	//For Operation 'deleteBulkPaymentTemplate' with service id 'deleteBulkPaymentTemplate3028'
	BulkPaymentTemplateRepository.prototype.deleteBulkPaymentTemplate = function(params, onCompletion){
		return BulkPaymentTemplateRepository.prototype.customVerb('deleteBulkPaymentTemplate', params, onCompletion);
	};

	//For Operation 'createBulkPaymentTemplate' with service id 'createBulkPaymentTemplate6913'
	BulkPaymentTemplateRepository.prototype.createBulkPaymentTemplate = function(params, onCompletion){
		return BulkPaymentTemplateRepository.prototype.customVerb('createBulkPaymentTemplate', params, onCompletion);
	};

	return BulkPaymentTemplateRepository;
})