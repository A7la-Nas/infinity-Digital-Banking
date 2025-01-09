define(['redux','./DetailTypeReducer'],function (redux, DetailTypeReducer) {  
  return redux.createStore(DetailTypeReducer.getState);
});