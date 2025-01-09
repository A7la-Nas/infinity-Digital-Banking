define(['redux','./AcknowledgementComponentReducer'],function (redux, AcknowledgementComponentReducer) {  
  return redux.createStore(AcknowledgementComponentReducer.getState);
});