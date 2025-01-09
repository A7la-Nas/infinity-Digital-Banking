define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function MessageRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	MessageRepository.prototype = Object.create(BaseRepository.prototype);
	MessageRepository.prototype.constructor = MessageRepository;

	//For Operation 'getRequestCategory' with service id 'getRequestCategory4222'
	MessageRepository.prototype.getRequestCategory = function(params, onCompletion){
		return MessageRepository.prototype.customVerb('getRequestCategory', params, onCompletion);
	};

	//For Operation 'updateRequest' with service id 'updateRequest9197'
	MessageRepository.prototype.updateRequest = function(params, onCompletion){
		return MessageRepository.prototype.customVerb('updateRequest', params, onCompletion);
	};

	//For Operation 'getRequests' with service id 'getRequests5580'
	MessageRepository.prototype.getRequests = function(params, onCompletion){
		return MessageRepository.prototype.customVerb('getRequests', params, onCompletion);
	};

	//For Operation 'createRequest' with service id 'CreateCustomerRequest7766'
	MessageRepository.prototype.createRequest = function(params, onCompletion){
		return MessageRepository.prototype.customVerb('createRequest', params, onCompletion);
	};

	//For Operation 'getAllMessagesForARequest' with service id 'getAllMessagesForARequest4187'
	MessageRepository.prototype.getAllMessagesForARequest = function(params, onCompletion){
		return MessageRepository.prototype.customVerb('getAllMessagesForARequest', params, onCompletion);
	};

	//For Operation 'getUnreadMessageCount' with service id 'getUnreadMessageCount3384'
	MessageRepository.prototype.getUnreadMessageCount = function(params, onCompletion){
		return MessageRepository.prototype.customVerb('getUnreadMessageCount', params, onCompletion);
	};

	//For Operation 'deleteAttachement' with service id 'DiscardMessageAttachment5886'
	MessageRepository.prototype.deleteAttachement = function(params, onCompletion){
		return MessageRepository.prototype.customVerb('deleteAttachement', params, onCompletion);
	};

	//For Operation 'addAttachment' with service id 'uploadMessageMediaBinary2667'
	MessageRepository.prototype.addAttachment = function(params, onCompletion){
		return MessageRepository.prototype.customVerb('addAttachment', params, onCompletion);
	};

	return MessageRepository;
})