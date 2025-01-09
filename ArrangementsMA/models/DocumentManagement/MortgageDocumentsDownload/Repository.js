define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function MortgageDocumentsDownloadRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	MortgageDocumentsDownloadRepository.prototype = Object.create(BaseRepository.prototype);
	MortgageDocumentsDownloadRepository.prototype.constructor = MortgageDocumentsDownloadRepository;

	//For Operation 'downloadChangeRepaymentDayReqAckMapping' with service id 'DownloadChangeRepaymentDayReqAckPDF7715'
	MortgageDocumentsDownloadRepository.prototype.downloadChangeRepaymentDayReqAckMapping = function(params, onCompletion){
		return MortgageDocumentsDownloadRepository.prototype.customVerb('downloadChangeRepaymentDayReqAckMapping', params, onCompletion);
	};

	//For Operation 'downloadChangeRepaymentAccountReqAckMapping' with service id 'DownloadChangeRepaymentAccountReqAckPDF8355'
	MortgageDocumentsDownloadRepository.prototype.downloadChangeRepaymentAccountReqAckMapping = function(params, onCompletion){
		return MortgageDocumentsDownloadRepository.prototype.customVerb('downloadChangeRepaymentAccountReqAckMapping', params, onCompletion);
	};

	return MortgageDocumentsDownloadRepository;
})