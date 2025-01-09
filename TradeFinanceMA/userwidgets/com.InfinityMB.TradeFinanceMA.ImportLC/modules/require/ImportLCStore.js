define(['redux','./ImportLCReducer'],function (redux, ImportLCReducer) {  
  return redux.createStore(ImportLCReducer.getState);
});