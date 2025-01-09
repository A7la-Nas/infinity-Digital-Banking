define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function CampaignsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	CampaignsRepository.prototype = Object.create(BaseRepository.prototype);
	CampaignsRepository.prototype.constructor = CampaignsRepository;

	//For Operation 'getCampaign' with service id 'getCampaigns1236'
	CampaignsRepository.prototype.getCampaign = function(params, onCompletion){
		return CampaignsRepository.prototype.customVerb('getCampaign', params, onCompletion);
	};

	//For Operation 'getPreLoginCampaigns' with service id 'getCampaigns7866'
	CampaignsRepository.prototype.getPreLoginCampaigns = function(params, onCompletion){
		return CampaignsRepository.prototype.customVerb('getPreLoginCampaigns', params, onCompletion);
	};

	return CampaignsRepository;
})