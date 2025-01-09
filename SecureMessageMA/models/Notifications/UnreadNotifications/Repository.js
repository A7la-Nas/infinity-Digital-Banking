define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function UnreadNotificationsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	UnreadNotificationsRepository.prototype = Object.create(BaseRepository.prototype);
	UnreadNotificationsRepository.prototype.constructor = UnreadNotificationsRepository;

	//For Operation 'GetMessagesNotifications' with service id 'GetMessagesNotifications3043'
	UnreadNotificationsRepository.prototype.GetMessagesNotifications = function(params, onCompletion){
		return UnreadNotificationsRepository.prototype.customVerb('GetMessagesNotifications', params, onCompletion);
	};

	//For Operation 'getCount' with service id 'getUnreadNotifications5049'
	UnreadNotificationsRepository.prototype.getCount = function(params, onCompletion){
		return UnreadNotificationsRepository.prototype.customVerb('getCount', params, onCompletion);
	};

	return UnreadNotificationsRepository;
})