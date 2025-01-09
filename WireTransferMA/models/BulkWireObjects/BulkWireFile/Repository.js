define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function BulkWireFileRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	BulkWireFileRepository.prototype = Object.create(BaseRepository.prototype);
	BulkWireFileRepository.prototype.constructor = BulkWireFileRepository;

	//For Operation 'uploadBWTemplateFile' with service id 'UploadBWTemplateFile2625'
	BulkWireFileRepository.prototype.uploadBWTemplateFile = function(params, onCompletion){
		return BulkWireFileRepository.prototype.customVerb('uploadBWTemplateFile', params, onCompletion);
	};

	//For Operation 'downloadFile' with service id 'downloadFile7129'
	BulkWireFileRepository.prototype.downloadFile = function(params, onCompletion){
		return BulkWireFileRepository.prototype.customVerb('downloadFile', params, onCompletion);
	};

	//For Operation 'uploadBWFile' with service id 'UploadBWFile4057'
	BulkWireFileRepository.prototype.uploadBWFile = function(params, onCompletion){
		return BulkWireFileRepository.prototype.customVerb('uploadBWFile', params, onCompletion);
	};

	//For Operation 'getBulkWireFileFormatTypes' with service id 'getBulkWireFileFormatTypes9584'
	BulkWireFileRepository.prototype.getBulkWireFileFormatTypes = function(params, onCompletion){
		return BulkWireFileRepository.prototype.customVerb('getBulkWireFileFormatTypes', params, onCompletion);
	};

	//For Operation 'getBulkWireFilesForUser' with service id 'getBulkWireFilesForUser2288'
	BulkWireFileRepository.prototype.getBulkWireFilesForUser = function(params, onCompletion){
		return BulkWireFileRepository.prototype.customVerb('getBulkWireFilesForUser', params, onCompletion);
	};

	//For Operation 'getBulkwireFileLineItems' with service id 'getBulkWireFileLineItems1730'
	BulkWireFileRepository.prototype.getBulkwireFileLineItems = function(params, onCompletion){
		return BulkWireFileRepository.prototype.customVerb('getBulkwireFileLineItems', params, onCompletion);
	};

	//For Operation 'downloadSampleFile' with service id 'downloadSampleFile3589'
	BulkWireFileRepository.prototype.downloadSampleFile = function(params, onCompletion){
		return BulkWireFileRepository.prototype.customVerb('downloadSampleFile', params, onCompletion);
	};

	//For Operation 'downloadFileBulkWire' with service id 'downloadFileBulkWire2111'
	BulkWireFileRepository.prototype.downloadFileBulkWire = function(params, onCompletion){
		return BulkWireFileRepository.prototype.customVerb('downloadFileBulkWire', params, onCompletion);
	};

	//For Operation 'initiateDownloadBulkWireSampleFile' with service id 'initiateDownloadBulkWireSampleFile6656'
	BulkWireFileRepository.prototype.initiateDownloadBulkWireSampleFile = function(params, onCompletion){
		return BulkWireFileRepository.prototype.customVerb('initiateDownloadBulkWireSampleFile', params, onCompletion);
	};

	return BulkWireFileRepository;
})