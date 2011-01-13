#   Usage:
#       tagalog.log(Whatever_I_Want_To_Log, tagging);
# 
#       Where:
#           Whatever_I_Want_To_Log    is something stringable, or a list of stringable things
#       And:
#           tagging    is either a tag string or a list of tag strings
# 
# 
#   You can turn logging on or off for a given tag in the CONFIG AREA.


import datetime

# THIS IS THE CONFIG AREA -- edit inline, or extend/override
config = {
  # this path can be relative or absolute
  'log_file_path' : '/var/log/tagalog.log',

  # set this to true if you want ALL logging turned off:
  'kill_switch' : False,
  
  # turn logging on and off here for various tags:
  'tags' : {
    'tag_1' : True,
    'tag_2' : True,
    'tag_3' : True,
    'off' : False,
    'force' : True,
    
    # the default tag:
    'untagged' : True, # this one is special
  },
}

def log(message, tag_input='untagged'):
  if config['kill_switch']:
    return None
    
  message = format_message(message)
  date_string = get_date_string()

  loggable_tags = get_loggable_tags(tag_input)

  log_file = open(config['log_file_path'], 'a')
  
  return_me = False
  
  for tag in loggable_tags:
    write_me = "%s [ %s ] %s\n" % (date_string, tag, message)
    log_file.write(write_me)
    return_me = True
  
  log_file.close()
  
  return return_me

def get_loggable_tags(tag_input):
  if type(tag_input) == type(""):
    tag_list = [tag_input]
  elif type(tag_input) == type([]):
    tag_list = tag_input
  else:
    raise TagalogException("Unsupported tag type. You must use a string or a list of strings (you sent %s )" % type(tag_input))
  
  return [tag for tag in tag_list if is_tag_loggable(tag)]

def is_tag_loggable(tag):
  return (not config['tags'].has_key(tag)) or (config['tags'][tag])
  

def get_date_string():
  time = datetime.datetime.now()
  return "%s" % time

def format_message(message):
  if type(message) == type("hi"):
    return message
  elif type(message) == type(u'hi'):
    return message
  elif type(message) == type([]):
    return message
  elif type(message) == type({}):
    return message
  
  else:
    raise TagalogException("Unsupported message type. Currently only string, list, and dictionary are supported (you sent %s )" % type(message))
  

class TagalogException (Exception):
  pass
  
  
# <license stuff>
# 
# tagalog is licensed under The MIT License
# 
# Copyright (c) 2010 Kyle Wild (dorkitude) - available at http://github.com/dorkitude/tagalog
# 
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
# 
# </license stuff>