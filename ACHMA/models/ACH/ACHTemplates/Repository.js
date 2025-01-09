define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ACHTemplatesRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ACHTemplatesRepository.prototype = Object.create(BaseRepository.prototype);
	ACHTemplatesRepository.prototype.constructor = ACHTemplatesRepository;

	//For Operation 'Execute' with service id 'ExecuteTemplate2027'
	ACHTemplatesRepository.prototype.Execute = function(params, onCompletion){
		return ACHTemplatesRepository.prototype.customVerb('Execute', params, onCompletion);
	};

	//For Operation 'getTemplateDetailsById' with service id 'FetchACHTemplateById1436'
	ACHTemplatesRepository.prototype.getTemplateDetailsById = function(params, onCompletion){
		return ACHTemplatesRepository.prototype.customVerb('getTemplateDetailsById', params, onCompletion);
	};

	//For Operation 'getAllACHTemplates' with service id 'FetchAllACHTemplates6507'
	ACHTemplatesRepository.prototype.getAllACHTemplates = function(params, onCompletion){
		return ACHTemplatesRepository.prototype.customVerb('getAllACHTemplates', params, onCompletion);
	};

	//For Operation 'createACHTemplate' with service id 'CreateACHTemplate5942'
	ACHTemplatesRepository.prototype.createACHTemplate = function(params, onCompletion){
		return ACHTemplatesRepository.prototype.customVerb('createACHTemplate', params, onCompletion);
	};

	//For Operation 'editACHTemplate' with service id 'EditACHTemplate1509'
	ACHTemplatesRepository.prototype.editACHTemplate = function(params, onCompletion){
		return ACHTemplatesRepository.prototype.customVerb('editACHTemplate', params, onCompletion);
	};

	//For Operation 'deleteACHTemplate' with service id 'DeleteACHTemplate8991'
	ACHTemplatesRepository.prototype.deleteACHTemplate = function(params, onCompletion){
		return ACHTemplatesRepository.prototype.customVerb('deleteACHTemplate', params, onCompletion);
	};

	return ACHTemplatesRepository;
})