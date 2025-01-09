define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function EStatementsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	EStatementsRepository.prototype = Object.create(BaseRepository.prototype);
	EStatementsRepository.prototype.constructor = EStatementsRepository;

	//For Operation 'getStatementList' with service id 'getYearlyFileDetails9172'
	EStatementsRepository.prototype.getStatementList = function(params, onCompletion){
		return EStatementsRepository.prototype.customVerb('getStatementList', params, onCompletion);
	};

	//For Operation 'generateStatements' with service id 'generateEStatements4824'
	EStatementsRepository.prototype.generateStatements = function(params, onCompletion){
		return EStatementsRepository.prototype.customVerb('generateStatements', params, onCompletion);
	};

	return EStatementsRepository;
})