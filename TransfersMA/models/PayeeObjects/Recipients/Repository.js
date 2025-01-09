define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function RecipientsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	RecipientsRepository.prototype = Object.create(BaseRepository.prototype);
	RecipientsRepository.prototype.constructor = RecipientsRepository;

	//For Operation 'createWireTransfersPayee' with service id 'createWireTransfersPayee6093'
	RecipientsRepository.prototype.createWireTransfersPayee = function(params, onCompletion){
		return RecipientsRepository.prototype.customVerb('createWireTransfersPayee', params, onCompletion);
	};

	//For Operation 'getAllBICsAndBankDetails' with service id 'getAllBICsAndBankDetails1756'
	RecipientsRepository.prototype.getAllBICsAndBankDetails = function(params, onCompletion){
		return RecipientsRepository.prototype.customVerb('getAllBICsAndBankDetails', params, onCompletion);
	};

	//For Operation 'validateIBANandGetBankDetails' with service id 'validateIBANandGetBankDetails1726'
	RecipientsRepository.prototype.validateIBANandGetBankDetails = function(params, onCompletion){
		return RecipientsRepository.prototype.customVerb('validateIBANandGetBankDetails', params, onCompletion);
	};

	//For Operation 'getBankDetailsFromBIC' with service id 'getBankDetailsFromBIC2137'
	RecipientsRepository.prototype.getBankDetailsFromBIC = function(params, onCompletion){
		return RecipientsRepository.prototype.customVerb('getBankDetailsFromBIC', params, onCompletion);
	};

	//For Operation 'createP2PPayee' with service id 'createP2PPayee7759'
	RecipientsRepository.prototype.createP2PPayee = function(params, onCompletion){
		return RecipientsRepository.prototype.customVerb('createP2PPayee', params, onCompletion);
	};

	//For Operation 'getInterBankPayees' with service id 'getInterBankPayees1156'
	RecipientsRepository.prototype.getInterBankPayees = function(params, onCompletion){
		return RecipientsRepository.prototype.customVerb('getInterBankPayees', params, onCompletion);
	};

	//For Operation 'editWireTransfersPayee' with service id 'editWireTransfersPayee5661'
	RecipientsRepository.prototype.editWireTransfersPayee = function(params, onCompletion){
		return RecipientsRepository.prototype.customVerb('editWireTransfersPayee', params, onCompletion);
	};

	//For Operation 'getExternalPayees' with service id 'getExternalPayees8900'
	RecipientsRepository.prototype.getExternalPayees = function(params, onCompletion){
		return RecipientsRepository.prototype.customVerb('getExternalPayees', params, onCompletion);
	};

	//For Operation 'deleteP2PPayee' with service id 'deleteP2PPayee1342'
	RecipientsRepository.prototype.deleteP2PPayee = function(params, onCompletion){
		return RecipientsRepository.prototype.customVerb('deleteP2PPayee', params, onCompletion);
	};

	//For Operation 'getIntraBankPayees' with service id 'getIntraBankPayees5235'
	RecipientsRepository.prototype.getIntraBankPayees = function(params, onCompletion){
		return RecipientsRepository.prototype.customVerb('getIntraBankPayees', params, onCompletion);
	};

	//For Operation 'deleteExternalPayee' with service id 'deleteExternalPayee1481'
	RecipientsRepository.prototype.deleteExternalPayee = function(params, onCompletion){
		return RecipientsRepository.prototype.customVerb('deleteExternalPayee', params, onCompletion);
	};

	//For Operation 'editExternalPayee' with service id 'editExternalPayee5746'
	RecipientsRepository.prototype.editExternalPayee = function(params, onCompletion){
		return RecipientsRepository.prototype.customVerb('editExternalPayee', params, onCompletion);
	};

	//For Operation 'getWireTransfersPayee' with service id 'getWireTransfersPayees6596'
	RecipientsRepository.prototype.getWireTransfersPayee = function(params, onCompletion){
		return RecipientsRepository.prototype.customVerb('getWireTransfersPayee', params, onCompletion);
	};

	//For Operation 'createExternalPayee' with service id 'createExternalPayee8253'
	RecipientsRepository.prototype.createExternalPayee = function(params, onCompletion){
		return RecipientsRepository.prototype.customVerb('createExternalPayee', params, onCompletion);
	};

	//For Operation 'editP2PPayee' with service id 'editP2PPayee7115'
	RecipientsRepository.prototype.editP2PPayee = function(params, onCompletion){
		return RecipientsRepository.prototype.customVerb('editP2PPayee', params, onCompletion);
	};

	//For Operation 'deleteWireTransfersPayee' with service id 'deleteWireTransfersPayee7328'
	RecipientsRepository.prototype.deleteWireTransfersPayee = function(params, onCompletion){
		return RecipientsRepository.prototype.customVerb('deleteWireTransfersPayee', params, onCompletion);
	};

	//For Operation 'getInternationalPayees' with service id 'getInternationalPayees7825'
	RecipientsRepository.prototype.getInternationalPayees = function(params, onCompletion){
		return RecipientsRepository.prototype.customVerb('getInternationalPayees', params, onCompletion);
	};

	//For Operation 'getBeneficiaryNameFromAccountId' with service id 'getBeneficiaryNameFromAccountId4053'
	RecipientsRepository.prototype.getBeneficiaryNameFromAccountId = function(params, onCompletion){
		return RecipientsRepository.prototype.customVerb('getBeneficiaryNameFromAccountId', params, onCompletion);
	};
	RecipientsRepository.prototype.getPayeesList = function(params, onCompletion){
       return RecipientsRepository.prototype.customVerb('getPayeesList', params, onCompletion);
	};

	//For Operation 'getP2PPayee' with service id 'getP2PPayee1255'
	RecipientsRepository.prototype.getP2PPayee = function(params, onCompletion){
		return RecipientsRepository.prototype.customVerb('getP2PPayee', params, onCompletion);
	};

	return RecipientsRepository;
})