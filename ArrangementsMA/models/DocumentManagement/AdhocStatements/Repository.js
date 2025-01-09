define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function AdhocStatementsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	AdhocStatementsRepository.prototype = Object.create(BaseRepository.prototype);
	AdhocStatementsRepository.prototype.constructor = AdhocStatementsRepository;

	//For Operation 'download' with service id 'downloadAdhocStatementFile9457'
	AdhocStatementsRepository.prototype.download = function(params, onCompletion){
		return AdhocStatementsRepository.prototype.customVerb('download', params, onCompletion);
	};

	//For Operation 'getDetails' with service id 'getAdhocStatementDetails4762'
	AdhocStatementsRepository.prototype.getDetails = function(params, onCompletion){
		return AdhocStatementsRepository.prototype.customVerb('getDetails', params, onCompletion);
	};

	//For Operation 'generate' with service id 'generateAdhocStatementFile8240'
	AdhocStatementsRepository.prototype.generate = function(params, onCompletion){
		return AdhocStatementsRepository.prototype.customVerb('generate', params, onCompletion);
	};

	return AdhocStatementsRepository;
})