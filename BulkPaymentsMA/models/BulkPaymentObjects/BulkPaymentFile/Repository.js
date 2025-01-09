define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function BulkPaymentFileRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	BulkPaymentFileRepository.prototype = Object.create(BaseRepository.prototype);
	BulkPaymentFileRepository.prototype.constructor = BulkPaymentFileRepository;

	//For Operation 'downloadBulkPaymentFileAck' with service id 'downloadBulkPaymentAck8222'
	BulkPaymentFileRepository.prototype.downloadBulkPaymentFileAck = function(params, onCompletion){
		return BulkPaymentFileRepository.prototype.customVerb('downloadBulkPaymentFileAck', params, onCompletion);
	};

	//For Operation 'initiateDownloadBulkPaymentAck' with service id 'initiateDownloadBulkPaymentAck4875'
	BulkPaymentFileRepository.prototype.initiateDownloadBulkPaymentAck = function(params, onCompletion){
		return BulkPaymentFileRepository.prototype.customVerb('initiateDownloadBulkPaymentAck', params, onCompletion);
	};

	//For Operation 'UploadFile' with service id 'uploadBulkPaymentFile5283'
	BulkPaymentFileRepository.prototype.UploadFile = function(params, onCompletion){
		return BulkPaymentFileRepository.prototype.customVerb('UploadFile', params, onCompletion);
	};

	//For Operation 'fetchUploadedFiles' with service id 'fetchUploadedFiles6228'
	BulkPaymentFileRepository.prototype.fetchUploadedFiles = function(params, onCompletion){
		return BulkPaymentFileRepository.prototype.customVerb('fetchUploadedFiles', params, onCompletion);
	};

	//For Operation 'fetchSampleFiles' with service id 'fetchSampleFiles3331'
	BulkPaymentFileRepository.prototype.fetchSampleFiles = function(params, onCompletion){
		return BulkPaymentFileRepository.prototype.customVerb('fetchSampleFiles', params, onCompletion);
	};

	return BulkPaymentFileRepository;
})