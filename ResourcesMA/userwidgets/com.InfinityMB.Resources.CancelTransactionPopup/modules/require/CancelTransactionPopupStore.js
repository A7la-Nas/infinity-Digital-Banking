define(['redux','./CancelTransactionPopupReducer'],function (redux, CancelTransactionPopupReducer) {  
  return redux.createStore(CancelTransactionPopupReducer.getState);
});