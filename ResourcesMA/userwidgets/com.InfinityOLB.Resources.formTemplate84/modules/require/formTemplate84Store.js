define(['redux', './formTemplate84Reducer'], function (redux, formTemplateReducer) {
  return redux.createStore(formTemplateReducer.getState);
});