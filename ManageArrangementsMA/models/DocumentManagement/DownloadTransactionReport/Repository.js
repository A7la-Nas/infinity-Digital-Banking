define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function DownloadTransactionReportRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	DownloadTransactionReportRepository.prototype = Object.create(BaseRepository.prototype);
	DownloadTransactionReportRepository.prototype.constructor = DownloadTransactionReportRepository;

	//For Operation 'downloadTransactionReport' with service id 'DownloadTransactionReport5192'
	DownloadTransactionReportRepository.prototype.downloadTransactionReport = function(params, onCompletion){
		return DownloadTransactionReportRepository.prototype.customVerb('downloadTransactionReport', params, onCompletion);
	};

	return DownloadTransactionReportRepository;
})