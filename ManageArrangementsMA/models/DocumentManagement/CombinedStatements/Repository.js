define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function CombinedStatementsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	CombinedStatementsRepository.prototype = Object.create(BaseRepository.prototype);
	CombinedStatementsRepository.prototype.constructor = CombinedStatementsRepository;

	//For Operation 'getStatements' with service id 'getAccountStatementDetails3701'
	CombinedStatementsRepository.prototype.getStatements = function(params, onCompletion){
		return CombinedStatementsRepository.prototype.customVerb('getStatements', params, onCompletion);
	};

	//For Operation 'generateCombinedStatementsFileId' with service id 'generateCombinedStatementFileId4121'
	CombinedStatementsRepository.prototype.generateCombinedStatementsFileId = function(params, onCompletion){
		return CombinedStatementsRepository.prototype.customVerb('generateCombinedStatementsFileId', params, onCompletion);
	};

	//For Operation 'generate' with service id 'generateCombinedStatementFile5835'
	CombinedStatementsRepository.prototype.generate = function(params, onCompletion){
		return CombinedStatementsRepository.prototype.customVerb('generate', params, onCompletion);
	};

	return CombinedStatementsRepository;
})