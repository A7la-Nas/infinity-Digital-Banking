define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function NotificationListRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	NotificationListRepository.prototype = Object.create(BaseRepository.prototype);
	NotificationListRepository.prototype.constructor = NotificationListRepository;

	//For Operation 'deleteNotification' with service id 'deleteNotification6942'
	NotificationListRepository.prototype.deleteNotification = function(params, onCompletion){
		return NotificationListRepository.prototype.customVerb('deleteNotification', params, onCompletion);
	};

	return NotificationListRepository;
})