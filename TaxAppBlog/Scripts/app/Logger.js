///////////////////////////////////////////////////////////////////////////////
// Logger.js
// =========
// singleton log class (module pattern)
//
// This class creates a drawable tab at the bottom of web browser. You can slide
// up/down by clicking the tab. You can toggle on/off programmatically by
// calling Logger.show() and Logger.hide() respectively.
//
// Use log() utility function to print a message to the log window.
// e.g.: log("Hello") : print Hello
//       log(123)     : print 123
//       log()        : print a blank line without time stamp
//
// History:
//          1.08: Use requestAnimationFrame() for animations.
//          1.07: Wrap a message if it is longer than the window width.
//          1.06: Print "undefined" or "null" if msg is undefined or null value.
//          1.05: Added time stamp for log() (with no param).
//          1.04: Modified handling undefined type of msg.
//          1.03: Fixed the error when msg is undefined.
//          1.02: Added sliding animation easy in/out using cosine.
//          1.01: Changed "display:none" to visibility:hidden for logDiv.
//                Supported IE v8 without transparent background.
//          1.00: First public release.
//
//  AUTHOR: Song Ho Ahn (song.ahn@gmail.com)
// CREATED: 2011-02-15
// UPDATED: 2013-02-05
//
// Copyright 2011. Song Ho Ahn
///////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////
// utility function to print message with timestamp to log
// e.g.: log("Hello")   : print Hello
//       log(123)       : print 123
//       log()          : print a blank line
function log(msg)
{
    if(arguments.length == 0)
        Logger.print(""); // print a blank line
    else
        Logger.print(msg);
};



///////////////////////////////////////////////////////////////////////////////
var Logger = (function()
{
    var self =
    {
        // properties
        version: "1.08.1",
        containerDiv: null,
        tabDiv: null,
        logDiv: null,
        visible: false,
        logHeight: 215, // 204 + 2*padding + border-top
        tabHeight: 26,  // 20 + padding-top + border-top
        // for animation
        animTime: 0,
        animDuration: 200,  // ms
        animFrameTime: 16,  // ms

        ///////////////////////////////////////////////////////////////////////
        // create a div for log and attach it to document
        init: function()
        {
            // avoid redundant call
            if(this.containerDiv)
                return true;
            // check if DOM is ready
            if(!document || !document.createElement || !document.body || !document.body.appendChild)
                return false;

            // constants
            var CONTAINER_DIV = "loggerContainer";
            var TAB_DIV = "loggerTab";
            var LOG_DIV = "logger";

            // create logger DOM element
            this.containerDiv = document.getElementById(CONTAINER_DIV);
            if(!this.containerDiv)
            {
                // container
                this.containerDiv = document.createElement("div");
                this.containerDiv.id = CONTAINER_DIV;
                this.containerDiv.setAttribute("style", "width:100%; " +
                                                        "height: " + this.logHeight + "px; " +
                                                        "margin:0; " +
                                                        "padding:0; " +
                                                        "position:fixed; " +
                                                        "left:0; ");
                this.containerDiv.style.bottom = "" + -this.logHeight + "px";   // hide it initially

                // tab
                this.tabDiv = document.createElement("div");
                this.tabDiv.id = TAB_DIV;
                this.tabDiv.appendChild(document.createTextNode("LOG"));
                cssHeight = "height:" + (this.tabHeight - 6) + "px; ";          // subtract padding-top and border-top
                this.tabDiv.setAttribute("style", "width:60px; " +
                                                  cssHeight +
                                                  "overflow:hidden; " +
                                                  "font:bold 12px verdana,helvetica,sans-serif;" +
                                                  "color:#fff; " +
                                                  "position:absolute; " +
                                                  "left:20px; " +
                                                  "top:" + -this.tabHeight + "px; " +
                                                  "margin:0; padding:5px 0 0 0; " +
                                                  "text-align:center; " +
                                                  "border:1px solid #aaa; " +
                                                  "border-bottom:none; " +
                                                  "background:#333; " +
                                                  "background:rgba(0,0,0,0.8); " +
                                                  "-webkit-border-top-right-radius:10px; " +
                                                  "-webkit-border-top-left-radius:10px; " +
                                                  "-khtml-border-radius-topright:10px; " +
                                                  "-khtml-border-radius-topleft:10px; " +
                                                  "-moz-border-radius-topright:10px; " +
                                                  "-moz-border-radius-topleft:10px; " +
                                                  "border-top-right-radius:10px; " +
                                                  "border-top-left-radius:10px; ");
                // add mouse event handlers
                this.tabDiv.onmouseover = function()
                {
                    this.style.cursor = "pointer";
                    this.style.textShadow = "0 0 1px #fff, 0 0 2px #0f0, 0 0 6px #0f0";
                };
                this.tabDiv.onmouseout = function()
                {
                    this.style.cursor = "auto";
                    this.style.textShadow = "none";
                };
                this.tabDiv.onclick = function()
                {
                    if(Logger.visible)
                        Logger.hide();
                    else
                        Logger.show();
                };

                // log message
                this.logDiv = document.createElement("div");
                this.logDiv.id = LOG_DIV;
                var cssHeight = "height:" + (this.logHeight - 11) + "px; "; // subtract paddings and border-top
                this.logDiv.setAttribute("style", "font:12px monospace; " +
                                                  cssHeight +
                                                  "color:#fff; " +
                                                  "overflow-x:hidden; " +
                                                  "overflow-y:scroll; " +
                                                  "visibility:hidden; " +
                                                  "position:relative; " +
                                                  "bottom:0px; " +
                                                  "margin:0px; " +
                                                  "padding:5px; " +
                                                  "background:#333; " +
                                                  "background:rgba(0, 0, 0, 0.8); " +
                                                  "border-top:1px solid #aaa; ");

                // style for log message
                var span = document.createElement("span"); // for coloring text
                span.style.color = "#afa";
                span.style.fontWeight = "bold";

                // the first message in log
                var msg = "===== Log Started at " +
                          this.getDate() + ", " + this.getTime() + ", " +
                          "(Version: " + this.version + ") " +
                          "=====";

                span.appendChild(document.createTextNode(msg));
                this.logDiv.appendChild(span);
                this.logDiv.appendChild(document.createElement("br"));  // blank line
                this.logDiv.appendChild(document.createElement("br"));  // blank line

                // add divs to document
                this.containerDiv.appendChild(this.tabDiv);
                this.containerDiv.appendChild(this.logDiv);
                document.body.appendChild(this.containerDiv);
            }

            return true;
        },
        ///////////////////////////////////////////////////////////////////////
        // print log message to logDiv
        print: function(msg)
        {
            // check if this object is initialized
            if(!this.containerDiv)
            {
                var ready = this.init();
                if(!ready)
                    return;
            }

            var msgDefined = true;

            // convert non-string type to string
            if(typeof msg == "undefined")   // print "undefined" if param is not defined
            {
                msg = "undefined";
                msgDefined = false;
            }
            else if(msg === null)           // print "null" if param has null value
            {
                msg = "null";
                msgDefined = false;
            }
            else
            {
                msg += ""; // for "object", "function", "boolean", "number" types
            }

            var lines = msg.split(/\r\n|\r|\n/);
            for(var i in lines)
            {
                // format time and put the text node to inline element
                var timeDiv = document.createElement("div");  // color for time
                timeDiv.setAttribute("style", "color:#999;" +
                                              "float:left;");

                var timeNode = document.createTextNode(this.getTime() + "\u00a0");
                timeDiv.appendChild(timeNode);

                // create message span
                var msgDiv = document.createElement("div");
                msgDiv.setAttribute("style", "float:left;" +
                                             "word-wrap:break-word;" +  // wrap msg
                                             "width:90%;");             // the width must be defined here
                if(!msgDefined)
                    msgDiv.style.color = "#afa"; // override color if msg is not defined

                // put message into a text node
                var line = lines[i].replace(/ /g, "\u00a0");
                var msgNode = document.createTextNode(line);
                msgDiv.appendChild(msgNode);

                // new line div with clearing css float property
                var newLineDiv = document.createElement("div");
                newLineDiv.setAttribute("style", "clear:both;");

                this.logDiv.appendChild(timeDiv);   // add time
                this.logDiv.appendChild(msgDiv);    // add message
                this.logDiv.appendChild(newLineDiv);// add message

                this.logDiv.scrollTop = this.logDiv.scrollHeight;   // scroll to last line
            }
        },
        ///////////////////////////////////////////////////////////////////////
        // get time and date as string with a trailing space
        getTime: function()
        {
            var now = new Date();
            var hour = "0" + now.getHours();
            hour = hour.substring(hour.length-2);
            var minute = "0" + now.getMinutes();
            minute = minute.substring(minute.length-2);
            var second = "0" + now.getSeconds();
            second = second.substring(second.length-2);
            return hour + ":" + minute + ":" + second;
        },
        getDate: function()
        {
            var now = new Date();
            var year = "" + now.getFullYear();
            var month = "0" + (now.getMonth()+1);
            month = month.substring(month.length-2);
            var date = "0" + now.getDate();
            date = date.substring(date.length-2);
            return year + "-" + month + "-" + date;
        },
        ///////////////////////////////////////////////////////////////////////
        // slide log container up and down
        show: function()
        {
            if(!this.containerDiv)
            {
                if(!this.init())
                    return;
            }

            if(this.visible)
                return;

            this.logDiv.style.visibility = "visible";

            this.animTime = Date.now();
            var requestAnimationFrame = getRequestAnimationFrameFunction();
            requestAnimationFrame(slideUp);
            function slideUp()
            {
                var duration = Date.now() - Logger.animTime;
                if(duration >= Logger.animDuration)
                {
                    Logger.containerDiv.style.bottom = 0;
                    Logger.visible = true;
                    return;
                }
                var y = Math.round(-Logger.logHeight * (1 - 0.5 * (1 - Math.cos(Math.PI * duration / Logger.animDuration))));
                Logger.containerDiv.style.bottom = "" + y + "px";
                requestAnimationFrame(slideUp);
            }
        },
        hide: function()
        {
            if(!this.containerDiv)
            {
                if(!this.init())
                    return;
            }

            if(!this.visible)
                return;

            this.animTime = Date.now();
            var requestAnimationFrame = getRequestAnimationFrameFunction();
            requestAnimationFrame(slideDown);
            function slideDown()
            {
                var duration = Date.now() - Logger.animTime;
                if(duration >= Logger.animDuration)
                {
                    Logger.containerDiv.style.bottom = "" + -Logger.logHeight + "px";
                    Logger.logDiv.style.visibility = "hidden";
                    Logger.visible = false;
                    return;
                }
                var y = Math.round(-Logger.logHeight * 0.5 * (1 - Math.cos(Math.PI * duration / Logger.animDuration)));
                Logger.containerDiv.style.bottom = "" + y + "px";
                requestAnimationFrame(slideDown);
            }
        }
    };
    return self;
})();



///////////////////////////////////////////////////////////////////////////////
// return available requestAnimationFrame(), otherwise, fallback to setTimeOut
function getRequestAnimationFrameFunction()
{
    var requestAnimationFrame = window.requestAnimationFrame ||
                                window.mozRequestAnimationFrame ||
                                window.msRequestAnimationFrame ||
                                window.oRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame;
    if(requestAnimationFrame)
        return function(callback){ return requestAnimationFrame(callback); };
    else
        return function(callback){ return setTimeout(callback, 16); };
}
