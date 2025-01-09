define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ArrangementDetailsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ArrangementDetailsRepository.prototype = Object.create(BaseRepository.prototype);
	ArrangementDetailsRepository.prototype.constructor = ArrangementDetailsRepository;

	//For Operation 'getDetails' with service id 'getAccountDetails2410'
	ArrangementDetailsRepository.prototype.getDetails = function(params, onCompletion){
		return ArrangementDetailsRepository.prototype.customVerb('getDetails', params, onCompletion);
	};

	return ArrangementDetailsRepository;
})