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
 *  $.tamperAlert('.backBtn', 'Did you really want to do that?');
 * 
 */

jQuery.tamper = function(watchName, exitName, messageText) {

    // init
    var watchEl = $(watchName);
	var exitEl = $(exitName);
    messageText = messageText || "Are you sure? \nDoing so will lose any pending changes."; // default text

    // begin
    if (watchEl.length > 0) {

        // store arguments inside elements
        watchEl.data('altered', false);
        exitEl.data('tamper', { watch: watchName, message: messageText});

        // watch any keystrokes, flip flag
        watchEl.keypress(function() {
            $(this).data('altered', true);
        });
        
        // on clicking exit element, if tampered with, throw alert
        exitEl.click(function() {
            var returnVal = true;
            var el = $(this).data('tamper').watch;
            var flag = $(el).data('altered') || false;

            if (flag) {
                var msg = $(this).data('tamper').message;
                if (confirm(msg) === false) {
                    returnVal = false;
                }
            }
            return returnVal;
        });    
    }
};

// simpler version, basically assigns a message 
// on-click to an exit element to open

jQuery.tamperAlert = function(exitName, messageText) {

    // init
	var exitEl = $(exitName);
    messageText = messageText || "Are you sure? \nDoing so will lose any pending changes."; // default text

    // begin
    if (exitEl.length > 0) {

        // store arguments inside elements
        exitEl.data('tamper', { message: messageText});

        // on clicking exit element, throw alert
        exitEl.click(function() {
            var returnVal = true;
            var msg = $(this).data('tamper').message;
            
            if (confirm(msg) === false) { 
                returnVal = false; 
            }
            
            return returnVal;
        });    
    }
};