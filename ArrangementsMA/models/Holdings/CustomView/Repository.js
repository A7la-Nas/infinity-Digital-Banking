define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function CustomViewRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	CustomViewRepository.prototype = Object.create(BaseRepository.prototype);
	CustomViewRepository.prototype.constructor = CustomViewRepository;

	//For Operation 'updateView' with service id 'UpdateCustomView6488'
	CustomViewRepository.prototype.updateView = function(params, onCompletion){
		return CustomViewRepository.prototype.customVerb('updateView', params, onCompletion);
	};

	//For Operation 'createView' with service id 'CreateCustomView1406'
	CustomViewRepository.prototype.createView = function(params, onCompletion){
		return CustomViewRepository.prototype.customVerb('createView', params, onCompletion);
	};

	//For Operation 'getView' with service id 'GetCustomView2376'
	CustomViewRepository.prototype.getView = function(params, onCompletion){
		return CustomViewRepository.prototype.customVerb('getView', params, onCompletion);
	};

	//For Operation 'deleteView' with service id 'DeleteCustomView3490'
	CustomViewRepository.prototype.deleteView = function(params, onCompletion){
		return CustomViewRepository.prototype.customVerb('deleteView', params, onCompletion);
	};

	return CustomViewRepository;
})