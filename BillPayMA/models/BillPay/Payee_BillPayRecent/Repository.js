define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function Payee_BillPayRecentRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	Payee_BillPayRecentRepository.prototype = Object.create(BaseRepository.prototype);
	Payee_BillPayRecentRepository.prototype.constructor = Payee_BillPayRecentRepository;

	//For Operation 'getRecentPayee' with service id 'getRecentPayees3201'
	Payee_BillPayRecentRepository.prototype.getRecentPayee = function(params, onCompletion){
		return Payee_BillPayRecentRepository.prototype.customVerb('getRecentPayee', params, onCompletion);
	};

	return Payee_BillPayRecentRepository;
})