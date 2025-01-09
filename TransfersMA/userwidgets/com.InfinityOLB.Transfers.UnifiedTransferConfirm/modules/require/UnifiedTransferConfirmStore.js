define(['redux', './UnifiedTransferConfirmReducer'], function (redux, UnifiedTransferConfirmReducer) {
  return redux.createStore(UnifiedTransferConfirmReducer.getState);
});