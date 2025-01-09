define(['redux','./P2PActivationTileReducer'],function (redux, P2PActivationTileReducer) {  
  return redux.createStore(P2PActivationTileReducer.getState);
});