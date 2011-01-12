/*
* jquery.tamper.js
*  v 1.3
*
* Initial Author
*  John Griffiths
* 
* Description
*  Simply watches an element for changes, if any encountered flips the tamper flag to true.
*  If the exit button is clicked and the tamper flag is set to true a dialog will appear warning 
*  the user they will lose their changes if they click OK.
* 
* Params:
*  $(element)  : (required) element (textarea) to watch for changes
*  exitName    : (required) element (button) which classes as an exit when clicked
*  messageText : (optional) text to show in the alert dialog
*
* Example:
*  $("element_to_watch").tamper(exitName, messageText)
*
*  PLEASE NOTE: if an onclick event is present on the exit element it will clone it, remove it 
*  and append it so when the user click's ok it fires.
*  
*  v1.3 added support for TinyMCE to the 'tamper' function, if any elements have a class of 
*  .tinymce then it will use tinyMCE's .isDirty() method on-click for any changes.  if it returns 
*  true then data has changed.  Uses .each to support multiple tinyMCE controls on the page.
*
* Requires: jQuery v1.3+
* 
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html 
* 
*/