define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function BulkWireTransactionRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	BulkWireTransactionRepository.prototype = Object.create(BaseRepository.prototype);
	BulkWireTransactionRepository.prototype.constructor = BulkWireTransactionRepository;

	//For Operation 'getTransactionsByBulkWireFileExecutionId' with service id 'getTransactionsByBulkWireFileExecutionId3569'
	BulkWireTransactionRepository.prototype.getTransactionsByBulkWireFileExecutionId = function(params, onCompletion){
		return BulkWireTransactionRepository.prototype.customVerb('getTransactionsByBulkWireFileExecutionId', params, onCompletion);
	};

	//For Operation 'getTransactionsByBulkWireTemplateExecutionId' with service id 'getTransactionsByBulkWireTemplateExecutionId4808'
	BulkWireTransactionRepository.prototype.getTransactionsByBulkWireTemplateExecutionId = function(params, onCompletion){
		return BulkWireTransactionRepository.prototype.customVerb('getTransactionsByBulkWireTemplateExecutionId', params, onCompletion);
	};

	//For Operation 'GetBulkWireFileTransactionDetail' with service id 'getBulkWireFileTransactionDetails7652'
	BulkWireTransactionRepository.prototype.GetBulkWireFileTransactionDetail = function(params, onCompletion){
		return BulkWireTransactionRepository.prototype.customVerb('GetBulkWireFileTransactionDetail', params, onCompletion);
	};

	//For Operation 'getBulkWireTemplateTransactionDetail' with service id 'getBulkWireTemplateTransactionDetail2296'
	BulkWireTransactionRepository.prototype.getBulkWireTemplateTransactionDetail = function(params, onCompletion){
		return BulkWireTransactionRepository.prototype.customVerb('getBulkWireTemplateTransactionDetail', params, onCompletion);
	};

	return BulkWireTransactionRepository;
})