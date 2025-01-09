define(['redux', './formTemplate12Reducer'], function (redux, formTemplateReducer) {
  return redux.createStore(formTemplateReducer.getState);
});