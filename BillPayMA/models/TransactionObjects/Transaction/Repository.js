define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function TransactionRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	TransactionRepository.prototype = Object.create(BaseRepository.prototype);
	TransactionRepository.prototype.constructor = TransactionRepository;

	//For Operation 'P2PTransferDelete' with service id 'DeleteP2PTransaction3685'
	TransactionRepository.prototype.P2PTransferDelete = function(params, onCompletion){
		return TransactionRepository.prototype.customVerb('P2PTransferDelete', params, onCompletion);
	};

	//For Operation 'DomesticWireTransfer' with service id 'CreateDomesticWireTransaction7271'
	TransactionRepository.prototype.DomesticWireTransfer = function(params, onCompletion){
		return TransactionRepository.prototype.customVerb('DomesticWireTransfer', params, onCompletion);
	};

	//For Operation 'InterBankFundTransferCancelOccurrence' with service id 'CancelOccurrenceInterBankFundTransaction1056'
	TransactionRepository.prototype.InterBankFundTransferCancelOccurrence = function(params, onCompletion){
		return TransactionRepository.prototype.customVerb('InterBankFundTransferCancelOccurrence', params, onCompletion);
	};

	//For Operation 'InternationalWireTransfer' with service id 'CreateInternationalWireTransaction7490'
	TransactionRepository.prototype.InternationalWireTransfer = function(params, onCompletion){
		return TransactionRepository.prototype.customVerb('InternationalWireTransfer', params, onCompletion);
	};

	//For Operation 'CreateBulkWireTransfer' with service id 'CreateBulkWireTransfer8866'
	TransactionRepository.prototype.CreateBulkWireTransfer = function(params, onCompletion){
		return TransactionRepository.prototype.customVerb('CreateBulkWireTransfer', params, onCompletion);
	};

	//For Operation 'InterBankAccFundTransfer' with service id 'CreateInterBankFundTransaction4344'
	TransactionRepository.prototype.InterBankAccFundTransfer = function(params, onCompletion){
		return TransactionRepository.prototype.customVerb('InterBankAccFundTransfer', params, onCompletion);
	};

	//For Operation 'InternationalFundTransferEdit' with service id 'EditInternationalFundTransaction1263'
	TransactionRepository.prototype.InternationalFundTransferEdit = function(params, onCompletion){
		return TransactionRepository.prototype.customVerb('InternationalFundTransferEdit', params, onCompletion);
	};

	//For Operation 'TransferToOwnAccountsEdit' with service id 'EditOwnAccountTransaction2477'
	TransactionRepository.prototype.TransferToOwnAccountsEdit = function(params, onCompletion){
		return TransactionRepository.prototype.customVerb('TransferToOwnAccountsEdit', params, onCompletion);
	};

	//For Operation 'IntraBankAccFundTransferDelete' with service id 'DeleteIntraBankFundTranscation2627'
	TransactionRepository.prototype.IntraBankAccFundTransferDelete = function(params, onCompletion){
		return TransactionRepository.prototype.customVerb('IntraBankAccFundTransferDelete', params, onCompletion);
	};

	//For Operation 'IntraBankAccFundTransfer' with service id 'CreateIntraBankFundTranscation3452'
	TransactionRepository.prototype.IntraBankAccFundTransfer = function(params, onCompletion){
		return TransactionRepository.prototype.customVerb('IntraBankAccFundTransfer', params, onCompletion);
	};

	//For Operation 'InterBankFundTransferEdit' with service id 'EditInterBankFundTransaction7874'
	TransactionRepository.prototype.InterBankFundTransferEdit = function(params, onCompletion){
		return TransactionRepository.prototype.customVerb('InterBankFundTransferEdit', params, onCompletion);
	};

	//For Operation 'TransferToOwnAccounts' with service id 'CreateOwnAccountTransaction9648'
	TransactionRepository.prototype.TransferToOwnAccounts = function(params, onCompletion){
		return TransactionRepository.prototype.customVerb('TransferToOwnAccounts', params, onCompletion);
	};

	//For Operation 'P2PTransfer' with service id 'CreateP2PTransaction6580'
	TransactionRepository.prototype.P2PTransfer = function(params, onCompletion){
		return TransactionRepository.prototype.customVerb('P2PTransfer', params, onCompletion);
	};

	//For Operation 'BillPayTransferCancelOccurrence' with service id 'CancelOccurrenceBillPayTransaction1276'
	TransactionRepository.prototype.BillPayTransferCancelOccurrence = function(params, onCompletion){
		return TransactionRepository.prototype.customVerb('BillPayTransferCancelOccurrence', params, onCompletion);
	};

	//For Operation 'InterBankFundTransferDelete' with service id 'DeleteInterBankFundTransaction8883'
	TransactionRepository.prototype.InterBankFundTransferDelete = function(params, onCompletion){
		return TransactionRepository.prototype.customVerb('InterBankFundTransferDelete', params, onCompletion);
	};

	//For Operation 'TransferToOwnAccountsDelete' with service id 'DeleteOwnAccountTransaction6804'
	TransactionRepository.prototype.TransferToOwnAccountsDelete = function(params, onCompletion){
		return TransactionRepository.prototype.customVerb('TransferToOwnAccountsDelete', params, onCompletion);
	};

	//For Operation 'InternationalFundTransferCancelOccurrence' with service id 'CancelOccurrenceInternationalFundTransaction9541'
	TransactionRepository.prototype.InternationalFundTransferCancelOccurrence = function(params, onCompletion){
		return TransactionRepository.prototype.customVerb('InternationalFundTransferCancelOccurrence', params, onCompletion);
	};

	//For Operation 'IntraBankAccFundTransferCancelOccurrence' with service id 'CancelOccurrenceIntraBankFundTranscation9645'
	TransactionRepository.prototype.IntraBankAccFundTransferCancelOccurrence = function(params, onCompletion){
		return TransactionRepository.prototype.customVerb('IntraBankAccFundTransferCancelOccurrence', params, onCompletion);
	};

	//For Operation 'InternationalFundTransferDelete' with service id 'DeleteInternationalFundTransaction6615'
	TransactionRepository.prototype.InternationalFundTransferDelete = function(params, onCompletion){
		return TransactionRepository.prototype.customVerb('InternationalFundTransferDelete', params, onCompletion);
	};

	//For Operation 'P2PTransferCancelOccurrence' with service id 'CancelOccurrenceP2PTransaction3171'
	TransactionRepository.prototype.P2PTransferCancelOccurrence = function(params, onCompletion){
		return TransactionRepository.prototype.customVerb('P2PTransferCancelOccurrence', params, onCompletion);
	};

	//For Operation 'InternationalAccFundTransfer' with service id 'CreateInternationalFundTransaction3886'
	TransactionRepository.prototype.InternationalAccFundTransfer = function(params, onCompletion){
		return TransactionRepository.prototype.customVerb('InternationalAccFundTransfer', params, onCompletion);
	};

	//For Operation 'TransferToOwnAccountsCancelOccurrence' with service id 'CancelOccurrenceOwnAccountTransaction9574'
	TransactionRepository.prototype.TransferToOwnAccountsCancelOccurrence = function(params, onCompletion){
		return TransactionRepository.prototype.customVerb('TransferToOwnAccountsCancelOccurrence', params, onCompletion);
	};

	//For Operation 'P2PTransferEdit' with service id 'EditP2PTransaction4839'
	TransactionRepository.prototype.P2PTransferEdit = function(params, onCompletion){
		return TransactionRepository.prototype.customVerb('P2PTransferEdit', params, onCompletion);
	};

	//For Operation 'IntraBankAccFundTransferEdit' with service id 'EditIntraBankFundTranscation9185'
	TransactionRepository.prototype.IntraBankAccFundTransferEdit = function(params, onCompletion){
		return TransactionRepository.prototype.customVerb('IntraBankAccFundTransferEdit', params, onCompletion);
	};

	//For Operation 'createRDC' with service id 'CreateRDC3803'
	TransactionRepository.prototype.createRDC = function(params, onCompletion){
		return TransactionRepository.prototype.customVerb('createRDC', params, onCompletion);
	};

	return TransactionRepository;
})