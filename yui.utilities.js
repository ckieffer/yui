/**
 * Helper functions to aid in the testing of YUI component wrappers
 *
 * @author Chad Kieffer, ckieffer at gmail dot com
 */

var YuiUtilties = {
  nextIndex : null,
  /**
   * Clone a specified HTML element
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
    if (count > 0) {
      return count;
    } else {
      return 0;
    }
  },
  /**
   * Increment CSS ID and field names for an element and its child elements
   */
  incrementIndices : function(el, index) {
    if (index == 0) {
      var strClassName = el.className;
      this.nextIndex = this.getCountByClassName(strClassName) + 1;
      // Remove index number from the element's id
      el.id = this.removeIndex(el.id) + this.nextIndex;
    }
    // Handle IE
    if (YAHOO.env.ua.ie > 0) {
      var thisInnerHTML = el.innerHTML;
      thisInnerHTML = this.replaceIndices(thisInnerHTML);
      alert(thisInnerHTML);
      el.innerHTML = thisInnerHTML;
    // Other browsers
    } else {
      // Loop through the element's children
      var children = YAHOO.util.Dom.getChildren(el);
      for (var i=0; i<children.length; i++) {
        // Set various attributes, removed cloned form input values
        if (children[i].hasAttribute('id')) {
          children[i].id = this.removeIndex(children[i].id) + this.nextIndex;
        }
        if (children[i].hasAttribute('name')) {
          children[i].name = this.removeIndex(children[i].name) + this.nextIndex;
          children[i].value = '';
        }
        // Continue on with children of children
        if (children[i].hasChildNodes()) {
          this.incrementIndices(children[i], this.nextIndex);
        }
      }
    }
    return el;
  },
  /**
   * Remove an index off the end of an id or name attribute, ex. my_field1 > my_field
   */
  removeIndex : function(str) {
    return str.replace(/^([\w_-]*)[0-9]+$/i, "$1");
  },
  /**
   * In IE do a wholesale removal of form field values, replace 
   * indices at the end of id and name attributes
   */
  replaceIndices : function(str) {
    str = str.replace(/(value=.[^\s]*)/gi, "");
    return str.replace(/([\w_-]*)[0-9]+/g, "$1" + this.nextIndex);
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
