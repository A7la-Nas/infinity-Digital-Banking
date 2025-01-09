define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function QRPayRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	QRPayRepository.prototype = Object.create(BaseRepository.prototype);
	QRPayRepository.prototype.constructor = QRPayRepository;

	//For Operation 'CreateQRPayment' with service id 'QRPayment8761'
	QRPayRepository.prototype.CreateQRPayment = function(params, onCompletion){
		return QRPayRepository.prototype.customVerb('CreateQRPayment', params, onCompletion);
	};

	return QRPayRepository;
})