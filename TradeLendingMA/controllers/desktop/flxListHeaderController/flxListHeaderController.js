define({
  /**
   * Triggers when the view is created.
   */
  onViewCreated: function () {
    [
      'imgColumn1', 'imgColumn2', 'imgColumn3', 'imgColumn4', 'imgColumn5', 'imgColumn6', 'imgColumn7'
    ].forEach(w => this.view[w].cursorType = 'pointer');
  }
});