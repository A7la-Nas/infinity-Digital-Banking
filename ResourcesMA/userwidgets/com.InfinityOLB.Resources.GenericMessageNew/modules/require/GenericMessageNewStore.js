define(['redux','./GenericMessageNewReducer'],function (redux, GenericMessageNewReducer) {  
  return redux.createStore(GenericMessageNewReducer.getState);
});