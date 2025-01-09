define(['redux','./transferTypeReducer'],function (redux, transferTypeReducer) {  
  return redux.createStore(transferTypeReducer.getState);
});