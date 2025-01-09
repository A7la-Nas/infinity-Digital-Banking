

define(['redux','./activateP2PReducer'],function (redux, ActivateP2PReducer) {  
  return redux.createStore(ActivateP2PReducer.getState);
});