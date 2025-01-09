define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function DownloadTransactionsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	DownloadTransactionsRepository.prototype = Object.create(BaseRepository.prototype);
	DownloadTransactionsRepository.prototype.constructor = DownloadTransactionsRepository;

	//For Operation 'GenerateTransactionReport' with service id 'GenerateTransactionPDF3391'
	DownloadTransactionsRepository.prototype.GenerateTransactionReport = function(params, onCompletion){
		return DownloadTransactionsRepository.prototype.customVerb('GenerateTransactionReport', params, onCompletion);
	};

	//For Operation 'generate' with service id 'GenerateTransactionsDetails9283'
	DownloadTransactionsRepository.prototype.generate = function(params, onCompletion){
		return DownloadTransactionsRepository.prototype.customVerb('generate', params, onCompletion);
	};

	return DownloadTransactionsRepository;
})