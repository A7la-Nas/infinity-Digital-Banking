define(['redux','./UnifiedTransferSelectionP2PReducer'],function (redux, UnifiedTransferSelectionP2PReducer) {  
  return redux.createStore(UnifiedTransferSelectionP2PReducer.getState);
});