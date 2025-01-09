define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function TransactionSubRecordRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	TransactionSubRecordRepository.prototype = Object.create(BaseRepository.prototype);
	TransactionSubRecordRepository.prototype.constructor = TransactionSubRecordRepository;

	//For Operation 'fetchTransactionSubRecords' with service id 'FetchACHTransactionSubRecords6337'
	TransactionSubRecordRepository.prototype.fetchTransactionSubRecords = function(params, onCompletion){
		return TransactionSubRecordRepository.prototype.customVerb('fetchTransactionSubRecords', params, onCompletion);
	};

	return TransactionSubRecordRepository;
})