define(['redux','./ViewLCDetailsPopupReducer'],function (redux, ViewLCDetailsPopupReducer) {  
  return redux.createStore(ViewLCDetailsPopupReducer.getState);
});