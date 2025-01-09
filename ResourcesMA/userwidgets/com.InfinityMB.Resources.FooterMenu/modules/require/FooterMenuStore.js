define(['redux', './FooterMenuReducer'], function (redux, FooterMenuReducer) {
  return redux.createStore(FooterMenuReducer.getState);
});