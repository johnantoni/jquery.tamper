/*
 * jquery.tamper.js
 *  v 1.2
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
 *  watchName   : (required) element (textarea) to watch for changes
 *  exitName    : (required) element (button) which classes as an exit when clicked
 *  messageText : (optional) text to show in the alert dialog
 *
 *  PLEASE NOTE: if an onclick event is present on the exit element it will clone it, remove it 
 *  and append it so when the user click's ok it fires.
 *
 * Requires: jQuery v1.3+
 * 
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html 
 * 
 */