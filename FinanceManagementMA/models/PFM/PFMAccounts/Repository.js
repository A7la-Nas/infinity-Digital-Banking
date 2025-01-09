define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function PFMAccountsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	PFMAccountsRepository.prototype = Object.create(BaseRepository.prototype);
	PFMAccountsRepository.prototype.constructor = PFMAccountsRepository;

	//For Operation 'getPFMAccounts' with service id 'getAccountsPostLogin5807'
	PFMAccountsRepository.prototype.getPFMAccounts = function(params, onCompletion){
		return PFMAccountsRepository.prototype.customVerb('getPFMAccounts', params, onCompletion);
	};

	return PFMAccountsRepository;
})