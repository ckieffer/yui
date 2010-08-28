/**
 * Initialize YUI Button widgets for input (button, submit, reset) and button elements
 * 
 * @author Chad Kieffer, ckieffer at gmail dot com
 * 
 * @see http://developer.yahoo.com/yui/button/
 */

YuiButton = {

  elButtons: null,

  initialize: function() {
    var self = YuiButton;
    self.getButtons();
    self.renderButtons();
  },
  getButtons: function() {
    var buttons = YAHOO.util.Dom.getElementsByClassName('my-button', 'button');
    var inputs = YAHOO.util.Dom.getElementsByClassName('my-button', 'input');
    this.elButtons = buttons.concat(inputs);
  },
  renderButtons: function() {
    var buttons = new Array();
    for (var i=0; i<this.elButtons.length; i++) {
      buttons[i] = new YAHOO.widget.Button(this.elButtons[i].id);
    }
  }
};
