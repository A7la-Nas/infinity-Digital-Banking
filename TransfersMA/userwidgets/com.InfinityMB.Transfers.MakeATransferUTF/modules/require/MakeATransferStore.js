define(['redux','./MakeATransferReducer'],function (redux, MakeATransferReducer) {  
  return redux.createStore(MakeATransferReducer.getState);
});