/**
 *
 * This is the JS version of the "tagalog" logging library, described here:
 * http://github.com/dorkitude/tagalog
 *
 *
 *
 * Usage: 
 *
 *     // First, construct a tagalog instance.
 *     // (you probably want to do this somewhere in your <HEAD>):
 *     tagalog = new Tagalog({
 *
 *          // `loggedTags`
 *          // Tell Tagalog which tags to log
 *          loggedTags: { 
 *              "template_error": true,
 *              "critical": true,
 *              "some_old_feature" : false,
 *          },
 *
 *          // `alertedTags`
 *          // Tell Tagalog which tags to alert (great for dev!)
 *          alertedTags: {
 *              "critical": true
 *          },
 * 
 *          // `onWriteMessage`
 *          // If you need, you can replace the default 'writeMessage' event
 *          // handler with your own (for instance, a third-party logger, an
 *          // IDE function, or something that touches adds stuff to a debug
 *          // console in the DOM):
 *          onWriteMessage: function(message) {
 *              myLogger.log(message);
 *          },
 *
 *
 *          // `killSwitch`
 *          // You may want this to be 'true' in production.
 *          // If true, this would neutralize tagalog:
 *          killSwitch: false,
 *
 *      });
 *
 *
 *      // Next, use your new instance of Tagalog to log stuff!
 *      tagalog.log("my message", "a tag for the message");
 *      tagalog.log("my message #2", ["tag1", "tag2"]);
 *
 *      // You can even use it as a great way to avoid hardcoding alerts:
 *      if (fragile_auth.failed.three_times) {
 *          tagalog.log("Stop trying to hax us please!", "critical");
 *      }
 *
 *
 *
 *
 *  Requires Mootools (Class, Options, Events, Array, and JSON)
 *  Tested with Mootools version(s): 1.4, 1.4.1
 *
 */



Tagalog = new Class({

    Implements: [Options, Events],

    options: {
        // `killSwitch`, boolean
        // If this is true, Tagalog's log method will do nothing
        killSwitch: false,

        // `loggedTags`, object (map)
        // A key-value map between tags (string) and booleans.
        // When a message comes in for a given tag, Tagalog will look here
        // to determine if it should log or ignore the message.
        loggedTags: {}, 

        // `alertedTags`, object (map)
        // A key-value map between tags (string) and booleans.
        // Tagalog will ALERT look here
        // to determine if it should log or ignore the message.
        alertedTags: {},


        // `logUnknownTags`, boolean
        // If this is true, Tagalog will err on the side of "yes" when asking
        // itself "Shoudl I log messages assigned to this tag, even though I've
        // never heard of it?"  If it is false, messages belonging to unknown
        // tags will go unlogged. (NB: this has no effect on alerted tags.)
        logUnknownTags: true,

        // `logUntaggedMessages`, boolean
        // If this is true, Tagalog will LOG messages that are sent without 
        // any tag(s)
        logUntaggedMessages: true,

        // `alertUnknownTags`, boolean
        // If this is true, Tagalog will err on the side of "yes" when asking
        // itself "Shoudl I alert messages assigned to this tag, even though I've
        // never heard of it?"  
        alertUnknownTags: false,

        // `alertUntaggedMessages`, boolean
        // If this is true, Tagalog will ALERT messages that are sent without 
        // any tag(s)
        alertUntaggedMessages: false,

        // `onWriteMessage`, function
        // This event handler should take in a string and write it somewhere:
        onWriteMessage: function(message) {
            console.log(message);
        },

        // `onAlertMessage`, function
        // This event handler should take in a string and "alert" it :
        onAlertMessage: function(message) {
           alert(message);
        },

        // `messageFormatter`, function
        // This function should take in an arbitrary object as its 'message',
        // and return a string representation of that object.
        messageFormatter: function(message) { 
            /**
             * Takes in an object of unknown type
             *
             * Returns a string that best represents that object
             *
             *
             * TODO: investigate better implementations, possibly write our own
             *
             * Current implementation is blindly ripped off from:
             * http://blog.stchur.com/2007/04/06/serializing-objects-in-javascript/ 
             *
             * The author states the snippet is "public".
             *
             */

            var _obj = message;

            // Let Gecko browsers do this the easy way
            if (typeof _obj.toSource !== 'undefined' && typeof _obj.callee ===
                    'undefined') {
                return _obj.toSource();
            }
            // Other browsers must do it the hard way
            switch (typeof _obj) {
                // numbers, booleans, and functions are trivial:
                // just return the object itself since its default .toString()
                // gives us exactly what we want
                case 'number':
                case 'boolean':
                case 'function':
                    return _obj;
                    break;

                    // for JSON format, strings need to be wrapped in quotes
                case 'string':
                    return '\'' + _obj + '\'';
                    break;

                case 'object':
                    var str;
                    if (_obj.constructor === Array || typeof _obj.callee !==
                            'undefined') {
                        str = '[';
                        var i, len = _obj.length;

                        for (i = 0; i < len-1; i++) { 
                            str += this.messageFormatter(_obj[i]) + ','; 
                        }

                        str += this.messageFormatter(_obj[i]) + ']';
                    }
                    else
                    {
                        str = '{';
                        var key;
                        for (key in _obj) { 
                            str += key + ':' + this.messageFormatter(_obj[key]) + ','; 
                        }
                        str = str.replace(/\,$/, '') + '}';
                    }
                    return str;
                    break;

                default:
                    return 'COULD NOT FORMAT';
                    break;
            }

        }, // end of `options.messageFormatter`


        // don't put anything below this line:
        noTrailingComma: true

    }, // end of `options`

    initialize: function(options) {
        this.setOptions(options);
    },

    log: function(message, tagging) {
        /**
         * This is the entry point into Tagalog.
         * 
         *
         * For most usage, just call it like this:
         *      tagalog.log(message, tag);
         *
         * 
         *  -`message`
         *      - This is the thing you want to log.
         *      - It can be any object with a "toString" method!
         *       
         *
         *
         *
         */

        // abort on killSwitch
        if (this.options.killSwitch) {
            return true;
        }

        // get an array of tags we should log
        var loggableTags = this.getLoggableTags(tagging);

        // get an array of tags we should alert
        var alertableTags = this.getAlertableTags(tagging);

        // make sure we're going to be performing at least one log or alert
        if (loggableTags.length + alertableTags.length == 0) {
            return true;
        }

        // format the message
        message = this.formatMessage(message);

        loggableTags.each(function(tag) {
            var tempMessage = "[" + tag + "] " + message;
            this.fireEvent('writeMessage', tempMessage);
        }, this);

        alertableTags.each(function(tag) {
            var tempMessage = "[" + tag + "] " + message;
            this.fireEvent('alertMessage', tempMessage);
        }, this);

    }, // end of `log`

    formatMessage: function(message) {
        return this.options.messageFormatter(message);
    },

    getLoggableTags: function(tagging) {
        return this.getXableTags(
                tagging,
                this.options.loggedTags, 
                this.options.logUntaggedMessages,
                this.options.logUnknownTags);
    },

    getAlertableTags: function(tagging) {
        return this.getXableTags(
                tagging, 
                this.options.alertedTags, 
                this.options.alertUntaggedMessages,
                this.options.alertUnknownTags);
    },

    getXableTags: function(
                          tagging, 
                          optionsMap, 
                          includeUntaggedMessages,
                          includeUnknownTags) {
        /**
         *
         * Returns an array of tags we should act on, based on the optionsMap.
         *
         * -`optionsMap`, object
         *      - a key-value boolean map
         *
         * -`tagging`, mixed
         *      - either a stringable object or an array of stringable objects
         *      - can also be null or undefined, in which case the 
         *          `includeUntaggedMessages` param comes into play
         *
         * -`includeUntaggedMessages`, boolean
         *      - whether or not we should act on undefined/null tagging
         *
         * -`includeUnknownTags`, boolean
         *      - whether or not we should act on tags that are missing from 
         *          the optionsMap
         *
         * This method is meant to be used by:
         *      -getAlertableTags
         *      -getLoggableTags
         */

        type = typeOf(tagging);

        // First, handle the undefined/null case
        if (type == "null") {
            if (includeUntaggedMessages) {
                return ["untagged"];
            }
            else {
                return [];
            }
        }

        if (type != "array") {
            tagging = [tagging];
        }

        // Make an array of all tags.
        tags = [];
        tagging.each(function(item) {
            tags.push(item.toString());
        });

        // Filter the array, based on the optionsMap, and return it.
        return tags.filter(function(item) {

            if (item in optionsMap) {
                return Boolean(optionsMap[item]);
            }
            else {
                return Boolean(includeUnknownTags);
            }
        });

    },


    
    
    // Don't put anything below this line:
    noTrailingComma: true
});

