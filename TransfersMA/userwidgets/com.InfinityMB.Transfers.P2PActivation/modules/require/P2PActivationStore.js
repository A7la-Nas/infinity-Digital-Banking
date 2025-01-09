define(['redux','./P2PActivationReducer'],function (redux, P2PActivationReducer) {  
  return redux.createStore(P2PActivationReducer.getState);
});