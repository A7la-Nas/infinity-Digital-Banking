function AS_Label_e2180500cdc64481a54c8a5c0bc6b4ee(eventobject, x, y) {
    var self = this;
    var viewConstants = require('ViewConstants');
    if (this.view.imgOption0.text === viewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO) {
        this.view.imgOption0.text = viewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
        this.view.imgOption1.text = viewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
        this.view.flxToggleOptions.forceLayout();
        if (this.onOptionToggle !== undefined && this.onOptionToggle !== null) {
            this.onOptionToggle();
        }
    }
}