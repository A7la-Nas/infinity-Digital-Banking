define(['redux','./ViewDetailsReducer'],function (redux, ViewDetailsReducer) {  
  return redux.createStore(ViewDetailsReducer.getState);
});