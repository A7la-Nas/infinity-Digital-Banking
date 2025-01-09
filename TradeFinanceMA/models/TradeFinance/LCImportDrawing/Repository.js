define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function LCImportDrawingRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	LCImportDrawingRepository.prototype = Object.create(BaseRepository.prototype);
	LCImportDrawingRepository.prototype.constructor = LCImportDrawingRepository;

	//For Operation 'submitImportLCDrawing' with service id 'submitImportLCDrawing2934'
	LCImportDrawingRepository.prototype.submitImportLCDrawing = function(params, onCompletion){
		return LCImportDrawingRepository.prototype.customVerb('submitImportLCDrawing', params, onCompletion);
	};

	//For Operation 'createImportLCDrawing' with service id 'createImportLCDrawing9875'
	LCImportDrawingRepository.prototype.createImportLCDrawing = function(params, onCompletion){
		return LCImportDrawingRepository.prototype.customVerb('createImportLCDrawing', params, onCompletion);
	};

	//For Operation 'getImportLCDrawings' with service id 'getImportLCDrawings6356'
	LCImportDrawingRepository.prototype.getImportLCDrawings = function(params, onCompletion){
		return LCImportDrawingRepository.prototype.customVerb('getImportLCDrawings', params, onCompletion);
	};

	//For Operation 'getImportLCDrawingById' with service id 'getImportLCDrawingById5582'
	LCImportDrawingRepository.prototype.getImportLCDrawingById = function(params, onCompletion){
		return LCImportDrawingRepository.prototype.customVerb('getImportLCDrawingById', params, onCompletion);
	};

	//For Operation 'updateImportLCDrawingByBank' with service id 'UpdateImportLCDrawingByBank9761'
	LCImportDrawingRepository.prototype.updateImportLCDrawingByBank = function(params, onCompletion){
		return LCImportDrawingRepository.prototype.customVerb('updateImportLCDrawingByBank', params, onCompletion);
	};

	return LCImportDrawingRepository;
})