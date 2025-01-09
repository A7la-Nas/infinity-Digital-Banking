define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function TaxSubTypeRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	TaxSubTypeRepository.prototype = Object.create(BaseRepository.prototype);
	TaxSubTypeRepository.prototype.constructor = TaxSubTypeRepository;

	//For Operation 'FetchTaxSubTypes' with service id 'FetchACHTaxSubType9462'
	TaxSubTypeRepository.prototype.FetchTaxSubTypes = function(params, onCompletion){
		return TaxSubTypeRepository.prototype.customVerb('FetchTaxSubTypes', params, onCompletion);
	};

	return TaxSubTypeRepository;
})