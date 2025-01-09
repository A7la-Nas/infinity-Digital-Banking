define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ArrangementPreferencesRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ArrangementPreferencesRepository.prototype = Object.create(BaseRepository.prototype);
	ArrangementPreferencesRepository.prototype.constructor = ArrangementPreferencesRepository;

	//For Operation 'UpdateDetails' with service id 'updateUserAccountSettingsOperation1645'
	ArrangementPreferencesRepository.prototype.UpdateDetails = function(params, onCompletion){
		return ArrangementPreferencesRepository.prototype.customVerb('UpdateDetails', params, onCompletion);
	};

	return ArrangementPreferencesRepository;
})