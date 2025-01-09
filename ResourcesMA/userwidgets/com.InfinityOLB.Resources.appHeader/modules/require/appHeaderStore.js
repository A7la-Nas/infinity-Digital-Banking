define(["redux", "./appHeaderReducer"], function (redux, appHeaderReducer) {
	return redux.createStore(appHeaderReducer.getState);
});
