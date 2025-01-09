define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function TravelNotificationsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	TravelNotificationsRepository.prototype = Object.create(BaseRepository.prototype);
	TravelNotificationsRepository.prototype.constructor = TravelNotificationsRepository;

	//For Operation 'updatePlan' with service id 'updateTravelNotification4123'
	TravelNotificationsRepository.prototype.updatePlan = function(params, onCompletion){
		return TravelNotificationsRepository.prototype.customVerb('updatePlan', params, onCompletion);
	};

	//For Operation 'getPlan' with service id 'getTravelNotification2919'
	TravelNotificationsRepository.prototype.getPlan = function(params, onCompletion){
		return TravelNotificationsRepository.prototype.customVerb('getPlan', params, onCompletion);
	};

	//For Operation 'getStatus' with service id 'getTravelNotificationStatus8935'
	TravelNotificationsRepository.prototype.getStatus = function(params, onCompletion){
		return TravelNotificationsRepository.prototype.customVerb('getStatus', params, onCompletion);
	};

	//For Operation 'createPlan' with service id 'createTravelNotification6410'
	TravelNotificationsRepository.prototype.createPlan = function(params, onCompletion){
		return TravelNotificationsRepository.prototype.customVerb('createPlan', params, onCompletion);
	};

	//For Operation 'deletePlan' with service id 'deleteTravelNotification6950'
	TravelNotificationsRepository.prototype.deletePlan = function(params, onCompletion){
		return TravelNotificationsRepository.prototype.customVerb('deletePlan', params, onCompletion);
	};

	return TravelNotificationsRepository;
})