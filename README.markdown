###Why log tagging is better than log levels
A short and simple explanation is this analogy.
    log levels : log tagging :: Outlook folders : Gmail labels


In traditional logging and in today's standard logging libraries like Ruby's [Logger](http://ruby-doc.org/core/classes/Logger.html) class and Python's [Logging](http://docs.python.org/library/logging.html) module, each log entry is assigned a *log level*  (`critical/fatal`, `error`, `warning`, `info`, or `debug`).  In production, the first four are often left on, and the last one, `debug`, is often turned off.

The `debug` level is special because it's used almost exclusively during development and testing of features.  `debug` is most useful when combined with `tail -f`[(?)](http://goo.gl/jFUUJ)

This sort of logging  For instance, you might use `debug` to 

Some common uses for `debug` log level in standard practice include 

That leaves you with one giant `debug` bucket, into which all development/debug



For many devs, the `debug` and `info` levels equate to "levels I can use during development"

Okay, I admit it: the heading for this section is unnecessarily divisive.  Log levels have their place

Log levels (either numerical or something like `debug`, `info`, `critical`)

etc etc

#### before tagalog

here i am editing `feature1.py`
    def factory(inputDictionary):
        # i wonder what's going on in the input dictionary
    

#### There are two ways to develop:
- with an IDE
- with **tagalog**

...we'll just focus on the latter :)

#### why use tagalog?

