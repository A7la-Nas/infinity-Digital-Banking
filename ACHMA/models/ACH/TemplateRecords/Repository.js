define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function TemplateRecordsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	TemplateRecordsRepository.prototype = Object.create(BaseRepository.prototype);
	TemplateRecordsRepository.prototype.constructor = TemplateRecordsRepository;

	//For Operation 'fetchTemplateRecordById' with service id 'FetchACHTemplateRecords1609'
	TemplateRecordsRepository.prototype.fetchTemplateRecordById = function(params, onCompletion){
		return TemplateRecordsRepository.prototype.customVerb('fetchTemplateRecordById', params, onCompletion);
	};

	return TemplateRecordsRepository;
})