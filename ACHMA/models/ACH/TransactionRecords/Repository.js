define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function TransactionRecordsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	TransactionRecordsRepository.prototype = Object.create(BaseRepository.prototype);
	TransactionRecordsRepository.prototype.constructor = TransactionRecordsRepository;

	//For Operation 'fetchTransactionRecordsById' with service id 'FetchACHTransactionRecords8525'
	TransactionRecordsRepository.prototype.fetchTransactionRecordsById = function(params, onCompletion){
		return TransactionRecordsRepository.prototype.customVerb('fetchTransactionRecordsById', params, onCompletion);
	};

	return TransactionRecordsRepository;
})