/*
 * jquery.tamper.js
 *  v 1.1
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
        
        // if onclick action then clone it, remove it and append it to the end of an ok
        if (exitEl.attr("onclick").length > 0) { 
            var exitAction = exitEl.attr("onclick");
            exitEl.removeAttr("onclick"); 
        }

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
            
            if (returnVal === true) {
                if (exitAction) { 
                    exitEl.attr("onclick", exitAction); 
                }
            }
            return returnVal;
        });    
    }
};

// simpler version (stand-alone function)
// basically assigns a message on-click to an exit element to open if internal flag is true

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
            var flag = $(this).data('altered') || false;
            
            if (flag) {
                if (confirm(msg) === false) { 
                    returnVal = false; 
                }
            }    
            return returnVal;
        });    
    }
};

// useful tool (stand-alone function)
// simply flips the exit element's internal flag to true.
// useful when have less control over actions, e.g. inside iframes.

jQuery.tamperFlag = function(exitName) {

    // init
	var exitEl = $(exitName);

    // begin
    if (exitEl.length > 0) {
        exitEl.data('altered', true);
    }
};