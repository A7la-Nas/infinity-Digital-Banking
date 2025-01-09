define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function CIBAPushOperationRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	CIBAPushOperationRepository.prototype = Object.create(BaseRepository.prototype);
	CIBAPushOperationRepository.prototype.constructor = CIBAPushOperationRepository;

	//For Operation 'initiateCIBAPush' with service id 'bcauthorize9811'
	CIBAPushOperationRepository.prototype.initiateCIBAPush = function(params, onCompletion){
		return CIBAPushOperationRepository.prototype.customVerb('initiateCIBAPush', params, onCompletion);
	};

	//For Operation 'sendTransactionPush' with service id 'sendTransactionPush8864'
	CIBAPushOperationRepository.prototype.sendTransactionPush = function(params, onCompletion){
		return CIBAPushOperationRepository.prototype.customVerb('sendTransactionPush', params, onCompletion);
	};

	//For Operation 'verifyPushTransaction' with service id 'updateStatus4876'
	CIBAPushOperationRepository.prototype.verifyPushTransaction = function(params, onCompletion){
		return CIBAPushOperationRepository.prototype.customVerb('verifyPushTransaction', params, onCompletion);
	};

	return CIBAPushOperationRepository;
})