/*
 * jquery.tamper.js
 *  v 1.0
 *
 * Initial Author
 *  John Griffiths
 * 
 * Description
 *  Simpy watches an element for changes, if any encountered flips the flag.
 *  If the exit button is clicked and the flag is true a dialog appears warning user will lose changes.
 * 
 * Params:
 *  watchName   : element (textarea) to watch for changes
 *  exitName    : element (button) which classes as an exit when clicked
 *  messageText : text to show in the alert dialog
 *
 * Uses
 *  on input element of edit page, if user edits value, flag set and leaving via 
 *  back [exit] link show alert message
 *
 * Usage
 *  $.tamper('.backBtn', '.comment', 'Im sorry, Dave. Im afraid I cant do that.');
 *
 * Simpler version
 *  // assign message on click, if flag set to true
 *  $.tamperAlert('.backBtn', 'Did you really want to do that?');
 * 
 *  // set flag manually to true
 *  $.tamperFlag('.backBtn');
 */

/*
 * iframe version located here http://gist.github.com/537728
 */