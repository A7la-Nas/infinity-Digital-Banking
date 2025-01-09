define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function Payee_P2PRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	Payee_P2PRepository.prototype = Object.create(BaseRepository.prototype);
	Payee_P2PRepository.prototype.constructor = Payee_P2PRepository;

	//For Operation 'updateP2PPayee' with service id 'editP2PPayee7115'
	Payee_P2PRepository.prototype.updateP2PPayee = function(params, onCompletion){
		return Payee_P2PRepository.prototype.customVerb('updateP2PPayee', params, onCompletion);
	};

	//For Operation 'deleteP2PPayee' with service id 'deleteP2PPayee1342'
	Payee_P2PRepository.prototype.deleteP2PPayee = function(params, onCompletion){
		return Payee_P2PRepository.prototype.customVerb('deleteP2PPayee', params, onCompletion);
	};

	//For Operation 'createP2PPayee' with service id 'createP2PPayee7759'
	Payee_P2PRepository.prototype.createP2PPayee = function(params, onCompletion){
		return Payee_P2PRepository.prototype.customVerb('createP2PPayee', params, onCompletion);
	};

	//For Operation 'getP2PPayees' with service id 'getP2PPayee1255'
	Payee_P2PRepository.prototype.getP2PPayees = function(params, onCompletion){
		return Payee_P2PRepository.prototype.customVerb('getP2PPayees', params, onCompletion);
	};

	return Payee_P2PRepository;
})