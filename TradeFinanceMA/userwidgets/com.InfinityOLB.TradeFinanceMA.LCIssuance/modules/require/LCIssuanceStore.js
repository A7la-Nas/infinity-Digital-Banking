



define(['redux','./LCIssuanceReducer'],function (redux, LCIssuanceReducer) {  
  return redux.createStore(LCIssuanceReducer.getState);
});