define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function AlertsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	AlertsRepository.prototype = Object.create(BaseRepository.prototype);
	AlertsRepository.prototype.constructor = AlertsRepository;

	//For Operation 'setPreferences' with service id 'setAlertPreferences9622'
	AlertsRepository.prototype.setPreferences = function(params, onCompletion){
		return AlertsRepository.prototype.customVerb('setPreferences', params, onCompletion);
	};

	//For Operation 'getArrangementsStatus' with service id 'getCustomerAccountAlertPreference1217'
	AlertsRepository.prototype.getArrangementsStatus = function(params, onCompletion){
		return AlertsRepository.prototype.customVerb('getArrangementsStatus', params, onCompletion);
	};

	//For Operation 'getPreferences' with service id 'getCustomerAlertTypePreference6958'
	AlertsRepository.prototype.getPreferences = function(params, onCompletion){
		return AlertsRepository.prototype.customVerb('getPreferences', params, onCompletion);
	};

	//For Operation 'getCategories' with service id 'getCustomerAlertCategoryPreference9676'
	AlertsRepository.prototype.getCategories = function(params, onCompletion){
		return AlertsRepository.prototype.customVerb('getCategories', params, onCompletion);
	};

	return AlertsRepository;
})