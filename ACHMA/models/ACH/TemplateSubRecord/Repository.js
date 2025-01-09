define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function TemplateSubRecordRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	TemplateSubRecordRepository.prototype = Object.create(BaseRepository.prototype);
	TemplateSubRecordRepository.prototype.constructor = TemplateSubRecordRepository;

	//For Operation 'fetchTemplateSubRecords' with service id 'FetchACHTemplateSubRecords2391'
	TemplateSubRecordRepository.prototype.fetchTemplateSubRecords = function(params, onCompletion){
		return TemplateSubRecordRepository.prototype.customVerb('fetchTemplateSubRecords', params, onCompletion);
	};

	return TemplateSubRecordRepository;
})