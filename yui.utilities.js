/**
 * Helper functions to aid in the testing of YUI component wrappers
 *
 * @author Chad Kieffer, ckieffer at gmail dot com
 */

var YuiUtilties = {
  
  /**
   * Clone a specified HTML element
   * @todo Test against IE 8
   */
  cloneElement : function(elID) {
    var oOriginal = document.getElementById(elID);
    var oClone = oOriginal.cloneNode(true);
    oClone = this.incrementIndices(oClone, 0);
    var oParent = oOriginal.parentNode;
    oParent.appendChild(oClone);
  },
  getCountByClassName : function(className) {
    var count = YAHOO.util.Dom.getElementsByClassName(className).length;
    return count;
  },
  /**
   * Increment CSS ID and field names for an element and its child elements
   */
  incrementIndices : function(el, index) {
    if (index == 0) {
      var strClassName = el.className;
      var nextIndex = this.getCountByClassName(strClassName) + 1;
      // Remove index number from the element's id
       el.id = this.removeIndex(el.id) + nextIndex;
    }
    // Loop through the element's children
    var children = YAHOO.util.Dom.getChildren(el);
    for (var i=0; i<children.length; i++) {
      children[i].id = this.removeIndex(children[i].id) + nextIndex;
      // Handle form element names
      if (children[i].hasAttribute('name')) {
        children[i].setAttribute('name', this.removeIndex(children[i].id) + nextIndex);
        children[i].value = '';
      }
      // Continue on with children of children
      if (children[i].hasChildNodes()) {
        this.incrementIndices(children[i], nextIndex);
      }
    }
    return el;
  },
  removeIndex : function(str) {
    return str.replace(/[0-9]/, '');
  },
  /**
   * Show selected or entered values
   * @todo Make this re-usable
   */
  showFormValues : function(e) {
    YAHOO.util.Event.preventDefault(e);
    var oInput = YAHOO.util.Dom.getElementsByClassName('acInput', 'input');
    var oID = YAHOO.util.Dom.getElementsByClassName('acID', 'input');
    var oName = YAHOO.util.Dom.getElementsByClassName('acName', 'input');
    var acDebug = 'The following form values have been set:';
    for (var i = 0; i < oID.length; i++) {
      acDebug = acDebug
        + '\n\nInput: ' + oInput[i].id
        + '\nID: ' + oID[i].value
        + '\nName: ' + oName[i].value;
    }
    alert(acDebug);
  }
};
