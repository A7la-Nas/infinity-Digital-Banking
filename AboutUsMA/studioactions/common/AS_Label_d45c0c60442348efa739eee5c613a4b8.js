function AS_Label_d45c0c60442348efa739eee5c613a4b8(eventobject, x, y) {
    var self = this;
    var viewConstants = require('ViewConstants');
    if (this.view.imgOption1.text === viewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO) {
        this.view.imgOption1.text = viewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
        this.view.imgOption0.text = viewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
        this.view.flxToggleOptions.forceLayout();
        if (this.onOptionToggle !== undefined && this.onOptionToggle !== null) {
            this.onOptionToggle();
        }
    }
}