define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function MortgageRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	MortgageRepository.prototype = Object.create(BaseRepository.prototype);
	MortgageRepository.prototype.constructor = MortgageRepository;

	//For Operation 'CreatePartialRepayment' with service id 'createPartialRepayment2218'
	MortgageRepository.prototype.CreatePartialRepayment = function(params, onCompletion){
		return MortgageRepository.prototype.customVerb('CreatePartialRepayment', params, onCompletion);
	};

	//For Operation 'submitChangeRepaymentAccountServiceRequest' with service id 'submitChangeRepaymentAccountServiceRequestOperation5312'
	MortgageRepository.prototype.submitChangeRepaymentAccountServiceRequest = function(params, onCompletion){
		return MortgageRepository.prototype.customVerb('submitChangeRepaymentAccountServiceRequest', params, onCompletion);
	};

	//For Operation 'submitPartialRepaymentServiceRequestOperation' with service id 'SubmitPartialRepaymentServiceRequestOperation4332'
	MortgageRepository.prototype.submitPartialRepaymentServiceRequestOperation = function(params, onCompletion){
		return MortgageRepository.prototype.customVerb('submitPartialRepaymentServiceRequestOperation', params, onCompletion);
	};

	//For Operation 'getMortgageSimulatedResults' with service id 'getMortgageSimulatedResults7443'
	MortgageRepository.prototype.getMortgageSimulatedResults = function(params, onCompletion){
		return MortgageRepository.prototype.customVerb('getMortgageSimulatedResults', params, onCompletion);
	};

	//For Operation 'getMockSimulatedResults' with service id 'getMortgageSimulatedResults4081'
	MortgageRepository.prototype.getMockSimulatedResults = function(params, onCompletion){
		return MortgageRepository.prototype.customVerb('getMockSimulatedResults', params, onCompletion);
	};

	//For Operation 'getMortgageDrawings' with service id 'getMortgageDrawings6421'
	MortgageRepository.prototype.getMortgageDrawings = function(params, onCompletion){
		return MortgageRepository.prototype.customVerb('getMortgageDrawings', params, onCompletion);
	};

	//For Operation 'submitChangeRepaymentDayServiceRequest' with service id 'submitChangeRepaymentDayServiceRequestOperation5143'
	MortgageRepository.prototype.submitChangeRepaymentDayServiceRequest = function(params, onCompletion){
		return MortgageRepository.prototype.customVerb('submitChangeRepaymentDayServiceRequest', params, onCompletion);
	};

	//For Operation 'createAndGetPayOffSimulation' with service id 'CreateAndGetPayoffSimulation2350'
	MortgageRepository.prototype.createAndGetPayOffSimulation = function(params, onCompletion){
		return MortgageRepository.prototype.customVerb('createAndGetPayOffSimulation', params, onCompletion);
	};

	//For Operation 'getMortgageFacilityDetails' with service id 'getMortgageFacilities9005'
	MortgageRepository.prototype.getMortgageFacilityDetails = function(params, onCompletion){
		return MortgageRepository.prototype.customVerb('getMortgageFacilityDetails', params, onCompletion);
	};

	return MortgageRepository;
})