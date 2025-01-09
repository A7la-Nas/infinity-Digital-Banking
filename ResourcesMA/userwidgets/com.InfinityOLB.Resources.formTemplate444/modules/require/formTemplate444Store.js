define(['redux', './formTemplate444Reducer'], function (redux, formTemplateReducer) {
  return redux.createStore(formTemplateReducer.getState);
});