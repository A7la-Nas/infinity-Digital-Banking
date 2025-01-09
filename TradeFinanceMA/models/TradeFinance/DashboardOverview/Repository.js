define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function DashboardOverviewRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	DashboardOverviewRepository.prototype = Object.create(BaseRepository.prototype);
	DashboardOverviewRepository.prototype.constructor = DashboardOverviewRepository;

	//For Operation 'GetDashboardDetails' with service id 'GetDashboardDetails7306'
	DashboardOverviewRepository.prototype.GetDashboardDetails = function(params, onCompletion){
		return DashboardOverviewRepository.prototype.customVerb('GetDashboardDetails', params, onCompletion);
	};

	//For Operation 'GenerateAllTradesList' with service id 'GenerateAllTradesList6875'
	DashboardOverviewRepository.prototype.GenerateAllTradesList = function(params, onCompletion){
		return DashboardOverviewRepository.prototype.customVerb('GenerateAllTradesList', params, onCompletion);
	};

	//For Operation 'FetchPayables' with service id 'FetchPayables8611'
	DashboardOverviewRepository.prototype.FetchPayables = function(params, onCompletion){
		return DashboardOverviewRepository.prototype.customVerb('FetchPayables', params, onCompletion);
	};

	//For Operation 'FetchAllTradeDetails' with service id 'FetchAllTradeDetails7587'
	DashboardOverviewRepository.prototype.FetchAllTradeDetails = function(params, onCompletion){
		return DashboardOverviewRepository.prototype.customVerb('FetchAllTradeDetails', params, onCompletion);
	};

	//For Operation 'GenerateReceivablesList' with service id 'GenerateReceivablesList7492'
	DashboardOverviewRepository.prototype.GenerateReceivablesList = function(params, onCompletion){
		return DashboardOverviewRepository.prototype.customVerb('GenerateReceivablesList', params, onCompletion);
	};

	//For Operation 'UpdateTradeFinanceConfiguration' with service id 'UpdateTradeFinanceConfiguration2339'
	DashboardOverviewRepository.prototype.UpdateTradeFinanceConfiguration = function(params, onCompletion){
		return DashboardOverviewRepository.prototype.customVerb('UpdateTradeFinanceConfiguration', params, onCompletion);
	};

	//For Operation 'GeneratePayablesList' with service id 'GeneratePayablesList3530'
	DashboardOverviewRepository.prototype.GeneratePayablesList = function(params, onCompletion){
		return DashboardOverviewRepository.prototype.customVerb('GeneratePayablesList', params, onCompletion);
	};

	//For Operation 'FetchReceivables' with service id 'FetchReceivables9794'
	DashboardOverviewRepository.prototype.FetchReceivables = function(params, onCompletion){
		return DashboardOverviewRepository.prototype.customVerb('FetchReceivables', params, onCompletion);
	};

	//For Operation 'CreateTradeFinanceConfiguration' with service id 'CreateTradeFinanceConfiguration1492'
	DashboardOverviewRepository.prototype.CreateTradeFinanceConfiguration = function(params, onCompletion){
		return DashboardOverviewRepository.prototype.customVerb('CreateTradeFinanceConfiguration', params, onCompletion);
	};

	//For Operation 'FetchTradeFinanceConfiguration' with service id 'FetchTradeFinanceConfiguration4323'
	DashboardOverviewRepository.prototype.FetchTradeFinanceConfiguration = function(params, onCompletion){
		return DashboardOverviewRepository.prototype.customVerb('FetchTradeFinanceConfiguration', params, onCompletion);
	};

	//For Operation 'FetchLimits' with service id 'getLimits8022'
	DashboardOverviewRepository.prototype.FetchLimits = function(params, onCompletion){
		return DashboardOverviewRepository.prototype.customVerb('FetchLimits', params, onCompletion);
	};

	return DashboardOverviewRepository;
})