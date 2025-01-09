define(['redux','./PrintReportReducer'],function (redux, PrintReportReducer) {  
  return redux.createStore(PrintReportReducer.getState);
});