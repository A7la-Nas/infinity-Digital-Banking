define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function WithdrawalLimitRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	WithdrawalLimitRepository.prototype = Object.create(BaseRepository.prototype);
	WithdrawalLimitRepository.prototype.constructor = WithdrawalLimitRepository;

	//For Operation 'updateLimit' with service id 'createOrder7880'
	WithdrawalLimitRepository.prototype.updateLimit = function(params, onCompletion){
		return WithdrawalLimitRepository.prototype.customVerb('updateLimit', params, onCompletion);
	};

	return WithdrawalLimitRepository;
})