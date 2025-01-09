define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function BulkWireRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	BulkWireRepository.prototype = Object.create(BaseRepository.prototype);
	BulkWireRepository.prototype.constructor = BulkWireRepository;

	//For Operation 'GetUnselectedPayeesForBWTemplate' with service id 'GetUnselectedPayeesForBWTemplate5768'
	BulkWireRepository.prototype.GetUnselectedPayeesForBWTemplate = function(params, onCompletion){
		return BulkWireRepository.prototype.customVerb('GetUnselectedPayeesForBWTemplate', params, onCompletion);
	};

	//For Operation 'DeleteBulkWireTemplate' with service id 'DeleteBulkWireTemplate2854'
	BulkWireRepository.prototype.DeleteBulkWireTemplate = function(params, onCompletion){
		return BulkWireRepository.prototype.customVerb('DeleteBulkWireTemplate', params, onCompletion);
	};

	//For Operation 'getBulkWireTemplateLineItems' with service id 'getBulkWireTemplateLineItems5017'
	BulkWireRepository.prototype.getBulkWireTemplateLineItems = function(params, onCompletion){
		return BulkWireRepository.prototype.customVerb('getBulkWireTemplateLineItems', params, onCompletion);
	};

	//For Operation 'getBulkWiresForUser' with service id 'getBulkWiresForUser8327'
	BulkWireRepository.prototype.getBulkWiresForUser = function(params, onCompletion){
		return BulkWireRepository.prototype.customVerb('getBulkWiresForUser', params, onCompletion);
	};

	//For Operation 'CreateBulkWireTemplate' with service id 'CreateBulkWireTemplate4350'
	BulkWireRepository.prototype.CreateBulkWireTemplate = function(params, onCompletion){
		return BulkWireRepository.prototype.customVerb('CreateBulkWireTemplate', params, onCompletion);
	};

	//For Operation 'UpdateBulkWireTemplate' with service id 'UpdateBulkWireTemplate3248'
	BulkWireRepository.prototype.UpdateBulkWireTemplate = function(params, onCompletion){
		return BulkWireRepository.prototype.customVerb('UpdateBulkWireTemplate', params, onCompletion);
	};

	//For Operation 'DeleteBulkWireTemplateRecipient' with service id 'DeleteBulkWireTemplateRecipient2210'
	BulkWireRepository.prototype.DeleteBulkWireTemplateRecipient = function(params, onCompletion){
		return BulkWireRepository.prototype.customVerb('DeleteBulkWireTemplateRecipient', params, onCompletion);
	};

	return BulkWireRepository;
})