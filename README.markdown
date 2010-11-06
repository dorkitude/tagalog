###Why log tagging is better than log levels
In traditional logging and in modern standard logging libraries like Ruby's [Logger](http://ruby-doc.org/core/classes/Logger.html) class and Python's [Logging](http://docs.python.org/library/logging.html) module, each log entry is assigned a *log level*  (`critical/fatal`, `error`, `warning`, `info`, or `debug`)

The `debug` level is special because it's used almost exclusively during development and testing.

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

