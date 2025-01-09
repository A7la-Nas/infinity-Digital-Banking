define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ReportLostRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ReportLostRepository.prototype = Object.create(BaseRepository.prototype);
	ReportLostRepository.prototype.constructor = ReportLostRepository;

	//For Operation 'createRequest' with service id 'createOrder1364'
	ReportLostRepository.prototype.createRequest = function(params, onCompletion){
		return ReportLostRepository.prototype.customVerb('createRequest', params, onCompletion);
	};

	return ReportLostRepository;
})