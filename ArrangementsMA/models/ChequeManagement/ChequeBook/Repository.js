define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ChequeBookRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ChequeBookRepository.prototype = Object.create(BaseRepository.prototype);
	ChequeBookRepository.prototype.constructor = ChequeBookRepository;

	//For Operation 'createRequest' with service id 'createChequeBookRequest4938'
	ChequeBookRepository.prototype.createRequest = function(params, onCompletion){
		return ChequeBookRepository.prototype.customVerb('createRequest', params, onCompletion);
	};

	//For Operation 'getRequest' with service id 'getChequeBookRequests1422'
	ChequeBookRepository.prototype.getRequest = function(params, onCompletion){
		return ChequeBookRepository.prototype.customVerb('getRequest', params, onCompletion);
	};

	//For Operation 'getChequeType' with service id 'getChequeTypes6337'
	ChequeBookRepository.prototype.getChequeType = function(params, onCompletion){
		return ChequeBookRepository.prototype.customVerb('getChequeType', params, onCompletion);
	};

	return ChequeBookRepository;
})