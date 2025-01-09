define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function CashFlowRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	CashFlowRepository.prototype = Object.create(BaseRepository.prototype);
	CashFlowRepository.prototype.constructor = CashFlowRepository;

	//For Operation 'get12MonthCashFlow' with service id 'get12MonthCashFlow7849'
	CashFlowRepository.prototype.get12MonthCashFlow = function(params, onCompletion){
		return CashFlowRepository.prototype.customVerb('get12MonthCashFlow', params, onCompletion);
	};

	//For Operation 'getCashFlowExcel' with service id 'getCashFlowExcel1084'
	CashFlowRepository.prototype.getCashFlowExcel = function(params, onCompletion){
		return CashFlowRepository.prototype.customVerb('getCashFlowExcel', params, onCompletion);
	};

	return CashFlowRepository;
})