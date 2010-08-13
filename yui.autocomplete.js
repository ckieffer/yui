/**
 * YUI-based Autocomplete widget
 *
 * @author Chad Kieffer, <ckieffer at gmail dot com>
 * @url http://2tbsp.com/
 *
 * @see http://developer.yahoo.com/yui/autocomplete/
 * @see http://developer.yahoo.com/yui/examples/autocomplete/ac_combobox.html
 * @see http://developer.yahoo.com/yui/examples/autocomplete/ac_itemselect.html
 *
 * @example http://github.com/ckieffer/yui/raw/master/yui.autocomplete.html
 *
 * @todo Refactor to standard YUI widget object
 * @todo Use delegate to attach autocomplete to dynamically added elements
 * @todo Add support for remote data sources
 * @todo Pass or set configs per autocomplete element on the page
 */

YAHOO.example.autocomplete = function(e) {

  // The autocomplete element container
  var elContainer = new YAHOO.util.Element(this);
  var acKey = elContainer.get('id');

  // The autocomplete input
  var oInput = YAHOO.util.Dom.getFirstChild(elContainer);

  // Hidden fields to populate from selected or input AC widget value
  var oID = YAHOO.util.Dom.getElementsByClassName('acID', 'input', acKey);
  var oName = YAHOO.util.Dom.getElementsByClassName('acName', 'input', acKey);
  
  // Parent form element
  var oForm = YAHOO.util.Dom.getAncestorByTagName(acKey, 'form');

  // Create and append an options container
  var oOptions = document.createElement('div');
  oOptions.className = 'acOptions';
  elContainer.appendChild(oOptions);

  // Instantiate Data Source
  var oData = YAHOO.example.Data[acKey];
  var oDS = new YAHOO.util.LocalDataSource(oData);
  oDS.responseSchema = {fields: ['name', 'id']};

  // AutoComplete configuration options
  var oConfigs = {
    typeAhead: false,
    prehighlightClassName: 'yui-ac-prehighlight',
    useShadow: true,
    queryDelay: 0,
    minQueryLength: 0,
    animVert: .01
  }

  // Instantiate the AutoComplete
  var oAC = new YAHOO.widget.AutoComplete(oInput, oOptions, oDS, oConfigs);
  oAC.resultTypeList = false;
  oAC.maxResultsDisplayed = 40;

  // Create an options list toggle button for the AC field
  if (YAHOO.util.Dom.hasClass(elContainer, 'acToggle')) {
    // Create and append toggle button
    var oToggle = document.createElement('span');
    oToggle.className = 'acToggleBtn';
    oToggle.id = 'acToggleBtn' + acKey;
    elContainer.appendChild(oToggle);

    // Subheads combobox
    var Toggler = YAHOO.util.Dom.get(oToggle.id);
    var oButton = new YAHOO.widget.Button({container: Toggler});
    var onToggle = function(e) {
      //YAHOO.util.Event.stopEvent(e);
      if (!YAHOO.util.Dom.hasClass(Toggler, 'open')) {
        YAHOO.util.Dom.addClass(Toggler, 'open')
      }
      // Is open
      if (oAC.isContainerOpen()) {
        oAC.collapseContainer();
      // Is closed
      } else {
        oAC.getInputEl().focus(); // Needed to keep widget active
        setTimeout(function() { // For IE
          oAC.sendQuery('');
        },0);
      }
    }
    oButton.on('click', onToggle);
    oAC.containerCollapseEvent.subscribe(function(){YAHOO.util.Dom.removeClass(Toggler, 'open')});
  }

  // Define an event handler to populate a hidden form field
  var onSelect = function(sType, aArgs) {
      var oAC = aArgs[0]; // reference back to the AC instance
      var elLI = aArgs[1]; // reference to the selected LI element
      var oDataItem = aArgs[2]; // object literal of selected item's result data
      // Update hidden form fields with the selected item's id and name
      oID[0].value = oDataItem.id;
      oName[0].value = oDataItem.name;
  };
  oAC.itemSelectEvent.subscribe(onSelect);

  // Ensure that hidden fields are populated on submit
  var onFormSubmit = function(e) {
    var matchCount = 0;
    for (var i = 0; i < oData.length; i++) {
      if (oInput.value == oData[i].name) {
        oID.value = oData[i].id;
        matchCount++;
      }
    }
    // If a category title exists and it doesn't match existing options
    // set CategoryID to 0 to indicate that this is a new category
    if (matchCount == 0 && oInput.value.length > 0) {
      oID[0].value = 0;
      oName[0].value = oInput.value;
    // Existing value was deleted or no value was provided
    } else if (!oInput.value.length) {
      oID[0].value = -1;
      oName[0].value = '';
    }
  };
  YAHOO.util.Event.addListener(oForm, 'submit', onFormSubmit);

  return {
    oDS: oDS,
    oAC: oAC
  };
};