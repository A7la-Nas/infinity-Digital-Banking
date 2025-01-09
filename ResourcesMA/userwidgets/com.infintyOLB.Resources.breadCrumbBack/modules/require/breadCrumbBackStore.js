define(['redux', './breadCrumbBackReducer'], function (redux, breadCrumbBackReducer) {
  return redux.createStore(breadCrumbBackReducer.getState);
});