define(['redux','./UnifiedTransferSelectionReducer'],function (redux, UnifiedTransferSelectionReducer) {  
  return redux.createStore(UnifiedTransferSelectionReducer.getState);
});