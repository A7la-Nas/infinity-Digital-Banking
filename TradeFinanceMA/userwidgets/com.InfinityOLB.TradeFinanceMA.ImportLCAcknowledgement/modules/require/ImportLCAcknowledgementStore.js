define(['redux','./ImportLCAcknowledgementReducer'],function (redux, ImportLCAcknowledgementReducer) {  
  return redux.createStore(ImportLCAcknowledgementReducer.getState);
});