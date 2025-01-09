define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function BankDetailsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	BankDetailsRepository.prototype = Object.create(BaseRepository.prototype);
	BankDetailsRepository.prototype.constructor = BankDetailsRepository;

	//For Operation 'isValidIBAN' with service id 'validateIBAN4429'
	BankDetailsRepository.prototype.isValidIBAN = function(params, onCompletion){
		return BankDetailsRepository.prototype.customVerb('isValidIBAN', params, onCompletion);
	};

	//For Operation 'getBankDetailsFromBicCode' with service id 'validateBICandFetchBankName5665'
	BankDetailsRepository.prototype.getBankDetailsFromBicCode = function(params, onCompletion){
		return BankDetailsRepository.prototype.customVerb('getBankDetailsFromBicCode', params, onCompletion);
	};

	//For Operation 'GetBankNameByRoutingNumber' with service id 'GetBankNameByRoutingNumber7005'
	BankDetailsRepository.prototype.GetBankNameByRoutingNumber = function(params, onCompletion){
		return BankDetailsRepository.prototype.customVerb('GetBankNameByRoutingNumber', params, onCompletion);
	};

	//For Operation 'getSwiftCode' with service id 'getIBANdetails8043'
	BankDetailsRepository.prototype.getSwiftCode = function(params, onCompletion){
		return BankDetailsRepository.prototype.customVerb('getSwiftCode', params, onCompletion);
	};

	//For Operation 'getBICFromBankDetails' with service id 'getBICFromBankDetails1219'
	BankDetailsRepository.prototype.getBICFromBankDetails = function(params, onCompletion){
		return BankDetailsRepository.prototype.customVerb('getBICFromBankDetails', params, onCompletion);
	};

	return BankDetailsRepository;
})