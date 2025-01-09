define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ACHFileRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ACHFileRepository.prototype = Object.create(BaseRepository.prototype);
	ACHFileRepository.prototype.constructor = ACHFileRepository;

	//For Operation 'getAllACHFiles' with service id 'FetchAllACHFiles6461'
	ACHFileRepository.prototype.getAllACHFiles = function(params, onCompletion){
		return ACHFileRepository.prototype.customVerb('getAllACHFiles', params, onCompletion);
	};

	//For Operation 'UploadACHFile' with service id 'UploadACHFile4710'
	ACHFileRepository.prototype.UploadACHFile = function(params, onCompletion){
		return ACHFileRepository.prototype.customVerb('UploadACHFile', params, onCompletion);
	};

	//For Operation 'getFileDetailsByID' with service id 'FetchACHFileById1690'
	ACHFileRepository.prototype.getFileDetailsByID = function(params, onCompletion){
		return ACHFileRepository.prototype.customVerb('getFileDetailsByID', params, onCompletion);
	};

	return ACHFileRepository;
})