define(['redux','./viewRequestsReducer'],function (redux, ViewRequestsReducer) {  
  return redux.createStore(ViewRequestsReducer.getState);
});