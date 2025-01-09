define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function TransactionSigningRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	TransactionSigningRepository.prototype = Object.create(BaseRepository.prototype);
	TransactionSigningRepository.prototype.constructor = TransactionSigningRepository;

	//For Operation 'verifyTransactionSignature' with service id 'validateTransactionAndUpdateStatus9259'
	TransactionSigningRepository.prototype.verifyTransactionSignature = function(params, onCompletion){
		return TransactionSigningRepository.prototype.customVerb('verifyTransactionSignature', params, onCompletion);
	};

	return TransactionSigningRepository;
})