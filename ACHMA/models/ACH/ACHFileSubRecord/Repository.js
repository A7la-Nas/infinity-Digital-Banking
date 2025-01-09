define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ACHFileSubRecordRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ACHFileSubRecordRepository.prototype = Object.create(BaseRepository.prototype);
	ACHFileSubRecordRepository.prototype.constructor = ACHFileSubRecordRepository;

	//For Operation 'fetchACHFileSubRecords' with service id 'FetchACHFileSubRecords2561'
	ACHFileSubRecordRepository.prototype.fetchACHFileSubRecords = function(params, onCompletion){
		return ACHFileSubRecordRepository.prototype.customVerb('fetchACHFileSubRecords', params, onCompletion);
	};

	return ACHFileSubRecordRepository;
})