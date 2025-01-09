define(['redux', './formTemplate66Reducer'], function (redux, formTemplateReducer) {
  return redux.createStore(formTemplateReducer.getState);
});