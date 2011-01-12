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

(function ($) {

    $.fn.tamper = function (exitName, messageText) {

        // init
        var watchEl = $(this);
        var exitEl = $(exitName);
        messageText = messageText || "Are you sure? \nDoing so will lose any pending changes."; // default text

        // store arguments inside elements
        watchEl.data('altered', false);
        exitEl.data('tamper', { watch: this, message: messageText });

        // if onclick action then clone it, remove it and append it to the end of an ok
        if (typeof exitEl.attr("onclick") == 'function') {
            var exitAction = exitEl.attr("onclick");
            exitEl.removeAttr("onclick");
        }

        // watch any keystrokes, flip flag
        watchEl.keypress(function () {
            $(this).data('altered', true);
        });

        // on clicking exit element, if tampered with, throw alert
        exitEl.click(function () {
            var returnVal = true;
            var el = $(this).data('tamper').watch;
            var flag = $(el).data('altered') || false;

            // check if any are tinymce elements, if so use their native change checking
            if ($(el).filter(".tinymce").length > 0) {
                var dirty = false;
                // use .each for multiple editors
                $(tinyMCE.editors).each(function () {
                    if (this.isDirty()) { dirty = true };
                });
                if (dirty) { flag = dirty };
            }

            if (flag) {
                var msg = $(this).data('tamper').message;
                if (confirm(msg) === false) {
                    returnVal = false;
                }
            }

            if (returnVal === true | flag === false) {
                if (exitAction) {
                    exitEl.attr("onclick", exitAction);
                }
            }
            return returnVal;
        });

    };


    // (stand-alone) simpler version
    // basically assigns a message on-click to an exit element to open if internal flag is true

    $.fn.tamperAlert = function (messageText) {

        // init
        var exitEl = $(this);
        messageText = messageText || "Are you sure? \nDoing so will lose any pending changes."; // default text

        // store arguments inside elements
        exitEl.data('tamper', { message: messageText });

        // on clicking exit element, throw alert
        exitEl.click(function () {
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

    };


    // (stand-alone) simply flips the exit element's internal flag to true.
    // useful when have less control over actions, e.g. inside iframes.

    $.fn.tamperFlag = function () {

        $(this).data('altered', true);
    };

})(jQuery); 