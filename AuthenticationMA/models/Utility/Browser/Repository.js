define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function BrowserRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	BrowserRepository.prototype = Object.create(BaseRepository.prototype);
	BrowserRepository.prototype.constructor = BrowserRepository;

	//For Operation 'getSupportedBrowserMatrix' with service id 'GetSupportedBrowserMatrix6494'
	BrowserRepository.prototype.getSupportedBrowserMatrix = function(params, onCompletion){
		return BrowserRepository.prototype.customVerb('getSupportedBrowserMatrix', params, onCompletion);
	};

	//For Operation 'logBrowser' with service id 'LogBrowser3490'
	BrowserRepository.prototype.logBrowser = function(params, onCompletion){
		return BrowserRepository.prototype.customVerb('logBrowser', params, onCompletion);
	};

	return BrowserRepository;
})