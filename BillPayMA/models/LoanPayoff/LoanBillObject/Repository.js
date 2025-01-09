define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function LoanBillObjectRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	LoanBillObjectRepository.prototype = Object.create(BaseRepository.prototype);
	LoanBillObjectRepository.prototype.constructor = LoanBillObjectRepository;

	//For Operation 'getByParam' with service id 'getBillDetailst249729'
	LoanBillObjectRepository.prototype.getByParam = function(params, onCompletion){
		return LoanBillObjectRepository.prototype.customVerb('getByParam', params, onCompletion);
	};

	return LoanBillObjectRepository;
})