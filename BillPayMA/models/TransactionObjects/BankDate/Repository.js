define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function BankDateRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	BankDateRepository.prototype = Object.create(BaseRepository.prototype);
	BankDateRepository.prototype.constructor = BankDateRepository;

	//For Operation 'getBankDate' with service id 'getBankDates9400'
	BankDateRepository.prototype.getBankDate = function(params, onCompletion){
		return BankDateRepository.prototype.customVerb('getBankDate', params, onCompletion);
	};

	return BankDateRepository;
})