define(['redux', './UnifiedTransfersAcknowledgementReducer'], function (redux, UnifiedTransferReducer) {
  return redux.createStore(UnifiedTransferReducer.getState);
});