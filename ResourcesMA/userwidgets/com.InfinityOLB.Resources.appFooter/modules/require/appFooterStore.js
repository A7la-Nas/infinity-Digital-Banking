define(['redux', './appFooterReducer'], function (redux, appFooterReducer) {
  return redux.createStore(appFooterReducer.getState);
});