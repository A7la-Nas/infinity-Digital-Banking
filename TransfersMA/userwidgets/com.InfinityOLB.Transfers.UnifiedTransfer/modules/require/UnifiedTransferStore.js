define(['redux', './UnifiedTransferReducer'], function (redux, UnifiedTransferReducer) {
  return redux.createStore(UnifiedTransferReducer.getState);
});