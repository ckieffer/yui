/**
 * Initialize YUI Calendar widgets
 * 
 * @author Chad Kieffer, ckieffer at gmail dot com
 * Based on and inspired by code from Brad Harris http://bit.ly/aOmbYA
 *   and Christian Heilmann http://icant.co.uk/sandbox/eventdelegation
 * 
 * @link http://developer.yahoo.com/yui/calendar/
 *
 * @todo Test against IE and Opera
 * @todo Write a usage blog post, documentation
 *
 * Progressive enhancement
 * @todo Add "choose" button/link through the widget
 * @todo Apply the calendar container div to the input instead of requiring it be hard-coded
 *
 * Interactivity/Accessibility
 * @todo Clicking toggle buttons a second time, or clicking anywhere but the calendar, should close the calendar
 * @todo Add a second mode which triggers date picker when a date field gains focus
 * @todo Evaluate and add accessibility features
 *
 * Configuration
 * @todo Allow user-defined widget configurations
 * @todo Pass date formats for date fields through an attribute on the field
 */

YuiDatePicker = {
  
  calendarWidget : null,
  container : 'calendar_container',
  calendarID : 'yui_calendar',
  activeInput : null,
  btn : null,
  btnContainer : null,
  btnContainerClass : 'btn_container',
  btnClassRegEx : new RegExp('choose_date'),
  
  initialize : function() {
    YuiDatePicker.renderContainer();
    YAHOO.util.Event.delegate(this, 'click', YuiDatePicker.click, 'button');
  },
  click : function(e) {
    var self = YuiDatePicker;
    self.btn = YAHOO.util.Event.getTarget(e);
    if (self.btn.id.match(self.btnClassRegEx)) {
      self.btnContainer = YAHOO.util.Dom.getAncestorByClassName(self.btn, self.btnContainerClass);
      self.activeInput = YAHOO.util.Dom.getPreviousSibling(self.btnContainer);
      if (self.calendarWidget === null) {
        self.renderCalendar();
      }
      self.calendarWidget.show();
      self.positionCalendar();
    }
  },
  renderContainer : function() {
    var container = document.createElement('div');
    container.id = this.container;
    container.style.display = 'none';
    document.body.appendChild(container);
  },
  renderCalendar : function() {
    this.calendarWidget = new YAHOO.widget.Calendar(
        this.calendarID,
        this.container,
        {
          title:'Choose a date:',
          close:true,
          navigator:true}
      );
    this.calendarWidget.selectEvent.subscribe(this.populateDateField, this, true);
    this.calendarWidget.render();
  },
  positionCalendar : function() {
    var position = YAHOO.util.Dom.getXY(YAHOO.util.Dom.get(this.activeInput));
    position[1] = position[1] + 25;
    YAHOO.util.Dom.setXY(this.container, position);
  },
  populateDateField : function() {
    var date = this.calendarWidget.getSelectedDates()[0];
    YAHOO.util.Dom.get(this.activeInput).value = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
    this.calendarWidget.hide();
  },
  hide : function() {
    if (this.calendarWidget !== null) {
      this.calendarWidget.hide();
    }
  }
};