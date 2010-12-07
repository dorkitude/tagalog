#in which I attempt to convince you that log tagging is better than log levels


###A short and simple explanation via analogy[(?)](http://goo.gl/Wz6sm)
    log tagging : log levels :: Gmail labels : Outlook folders



###A longer explanation (for the unconvinced, the insatiably curious, and the androids among us)

In traditional logging and in today's standard logging libraries like Ruby's [Logger](http://ruby-doc.org/core/classes/Logger.html) class and Python's [Logging](http://docs.python.org/library/logging.html) module, each log entry is assigned a *log level*  (`critical`, `error`, `warning`, `info`, or `debug`).  In production, the first four are often left **on**, and the last one, `debug`, is often turned **off**.

####life with log levels
- Each log entry is in one and only one of the log levels (e.g. `error`, `info`, [xor](http://en.wikipedia.org/wiki/Exclusive_or) `debug`)
- Each log level is **on** or **off** in your environment settings
- This means that if, in order to work on Feature C, you turn `debug` **on**, your log will suddenly be flooded with irrelevant `debug` log entries from long-completed Features A and B. This forces you to revisit your A and B code, commenting or deleting logging calls - but some of these calls could come in handy in the future, at which point you'll have to *re* revisit your code again!
- Puppies don't play, lovers don't love, and it's always winter[(!)](https://gist.github.com/abaec9e62cff3b8a5c1b)

####life with log tagging, thanks to Tagalog!
- Each log entry has zero or more tags.  These tags can be any strings you like -- even `debug`, `error`, `critical`, `warning`, or `info`!
- Each tag is **on** or **off** in Tagalog's code (which you can hook to your environment's settings if you like)
- Tagalog will log an entry once for each associated tag that's set to **on**
- You develop faster, with less work, and most importantly, *with less code*


####Tagalog is easy to implement
You only need to know one function:
    Tagalog::log(message, tagging)
...where 'message' is a string or a stringable type[(?)](https://gist.github.com/e612159e53782a28b30b), and 'tagging' is either a string tag or an array of string tags.

####Tagalog is extensible
If you want to have two subclasses for Tagalog, like "DebugLogger"" and "ErrorLogger", you can do so quite easily.  Just extend Tagalog and override what you want to override, such as the path to the output file (ErrorLogger could write to your webserver's error logs, for instance)

####Tagalog is minimal
Tagalog is one drop-in file and is expressed in so little code that you can learn your way around it in just a few minutes.