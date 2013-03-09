/*!
* rosebrook.utils.screenlogger JavaScript Library v0.0.1
* http://www.evanrosebrook.com
* No copyright or license, please use it if you want it

* Date: Thu Dec 31 13:04:53 2010 -0500
*/


if (typeof rosebrook == 'undefined') { var rosebrook = {}; }
if (typeof rosebrook.utils == 'undefined') { rosebrook.utils = {}; }

rosebrook.utils.screenLogger = function (args) {

    /////////////////////////////////////////////////////////////////////////////
    // Private variables
    /////////////////////////////////////////////////////////////////////////////
    var logWindow = 'logWindow';
    var lineCount = 0;
    var lines = [];

    ///args
    if (typeof (args) == 'undefined') { args = {}; }
    var backgroundColor = (typeof (args.backgroundColor) == 'undefined') ? '#000' : args.backgroundColor;
    var position = (typeof (args.position) == 'undefined') ? 'topRight' : args.position;
    var color = (typeof (args.color) == 'undefined') ? 'green' : args.color;
    var width = (typeof (args.width) == 'undefined') ? '230' : args.width;
    var height = (typeof (args.height) == 'undefined') ? '150' : args.height;
    var buffer = (typeof (args.buffer) == 'undefined') ? 50 : args.buffer;

    var posStyle = "";

    switch (position) {

        case "topRight":
            posStyle = "top:0;right:0;";
            break;
        case "topLeft":
            posStyle = "top:0;left:0;";
            break;
        case "bottomRight":
            posStyle = "bottom:0;right:0;";
            break;
        case "bottomLeft":
            posStyle = "bottom:0;left:0;";
            break;
        default:
            posStyle = "top:0;right:0;";

    }
    //remove the logger window if it exists
    if ($('body').find('#' + logWindow).length > 0) { $('body').find('#logWindow').remove(); }
    //draw the logger window
    $('body').prepend('<div id="' + logWindow + '" style="height:' + height + 'px;width:' + width + 'px;background-color:' + backgroundColor + ';color:' + color + ';border:1px solid ' + color + ';position:fixed;z-index:999;padding-left:4px;' + posStyle + '">'
                       + '<div id="logWrapper" style="position:relative;width:100%;height:100%;">'
                       + '<div id="loggerTitleBar" style="border-bottom:1px solid #666;width:100%;" ><div id="title" style="float:left;">screenLogger: </div><div class="closeScreenLogger" style="cursor:pointer;color:red;padding-right:4px;float:right;" >[x] </div><div style="clear:both;"></div></div> '
                       + '<div style="height:85%;overflow:scroll;overflow-x:hidden;" id="logWindowContents">'
                       + '</div></div></div>');

    //$('body').find('#' + logWindow).find('#loggerTitleBar').css('position', 'fixed');

    $('.closeScreenLogger').live('click', function () { $('#logWindow').remove(); });
    /////////////////////////////////////////////////////////////////////////////
    // Private Methods
    /////////////////////////////////////////////////////////////////////////////

    //public
    return {
        /////////////////////////////////////////////////////////////////////////////
        // Public properties
        /////////////////////////////////////////////////////////////////////////////


        /////////////////////////////////////////////////////////////////////////////
        // Public Methods
        /////////////////////////////////////////////////////////////////////////////
        log: function (msg) {

            lineCount += 1;
            if (lineCount >= buffer)
                lines.shift();

            lines.push(msg);

            var linesMarkup = lines.join('<br />');

            $('#logWindowContents').html(linesMarkup);

            $("#logWindowContents").attr({ scrollTop: $("#logWindowContents").attr("scrollHeight") });

        },
        close: function () {
            $('body').find('#' + logWindow).remove();
        }

    };

}
$(document).ready(function () {
    screenLogger = rosebrook.utils.screenLogger({ "position": "topRight", "backgroundColor": "black" });
});
