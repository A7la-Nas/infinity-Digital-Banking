define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ACHFileRecordRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ACHFileRecordRepository.prototype = Object.create(BaseRepository.prototype);
	ACHFileRecordRepository.prototype.constructor = ACHFileRecordRepository;

	//For Operation 'fetchACHFileRecords' with service id 'FetchACHFileRecords4521'
	ACHFileRecordRepository.prototype.fetchACHFileRecords = function(params, onCompletion){
		return ACHFileRecordRepository.prototype.customVerb('fetchACHFileRecords', params, onCompletion);
	};

	return ACHFileRecordRepository;
})