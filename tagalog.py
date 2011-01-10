import datetime

# configure this inline or extend and override
config = {
  # this path can be relative or absolute
  'log_file_path' : '/var/log/tagalog.log',

  # set this to true if you want ALL logging turned off:
  'kill_switch' : False,
  
  # turn logging on and off here for various tags:
  'tags' : {
    'sup' : False,
    'tag_2' : False,
    'tag_3' : True,
    'off' : False,
    'force' : True,
  },
}


def log(message, tag_input):
  if config['kill_switch']:
    return None
    
  message = format_message(message)
  date_string = get_date_string()

  loggable_tags = get_loggable_tags(tag_input)

  log_file = open(config['log_file_path'], 'a')
  
  for tag in loggable_tags:
    write_me = "%s [ %s] %s\n" % (date_string, tag, message)
    log_file.write(write_me)
  
  log_file.close()
  
  return True

def get_loggable_tags(tag_input):
  print tag_input
  if type(tag_input) == type(""):
    print "its string"
    tag_list = [tag_input]
  elif type(tag_input) == type([]):
    print "its list"
    tag_list = tag_input
  else:
    raise TagalogException("Unsupported tag type (you must use a string or a list of strings)")
  
  
  return [tag for tag in tag_list if is_tag_loggable(tag)]

def is_tag_loggable(tag):
  return config['tags'].has_key(tag) and config['tags'][tag]
  

def get_date_string():
  time = datetime.datetime.now()
  return "%s" % time

def format_message(message):
  if type(message) == type("hi"):
    return message
  elif type(message) == type([]):
    return message
  elif type(message) == type({}):
    return message
  
  else raise TagalogException("Unsupported message type (currently only string, list, and dictionary are supported)")
    
    
  
  

class TagalogException (Exception):
  pass