/**
 * Creates the search tags.
 * @param {object} tags - Specifies the tags.
 */
function createTags(tags) {
  const container = document.getElementById('searchTags');
  let innerHtml = '';
  for (const key in tags) {
    innerHtml += `<div class='searchTag' id=${key}>
      <span>${tags[key]}</span>
      <div class='crossIcon' onclick="removeTag('${key}')"></div>
    </div>`;
  }
  container.innerHTML = innerHtml;
  const currFormController = window.parent.kony.mvc.getController(window.parent.kony.application.getCurrentForm().id);
  currFormController.setTagsContainerHeight(container.offsetHeight);
}
/**
 * Removes the tag.
 * @param {string} id - Specifies the tag id.
 */
function removeTag(id) {
  document.getElementById(id).remove();
  const currFormController = window.parent.kony.mvc.getController(window.parent.kony.application.getCurrentForm().id);
  currFormController.setTagsContainerHeight(document.getElementById('searchTags').offsetHeight);
  currFormController.removeSearchTag(id);
}