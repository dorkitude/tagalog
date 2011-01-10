import logging
import datetime

class Tagalog(object):

  # configure this inline or extend and override
  config = {
    # this path can be relative or absolute
    'log_file_path' : '/var/log/tagalog.log',

    # set this to true if you want ALL logging turned off:
    'kill_switch' : False,
    
    # turn logging on and off here for various tags:
    'tags' : {
      'sup' => False,
      'tag_2' => False,
      'tag_3' => True,
      'off' => False,
      'force' => True,
    },
  }