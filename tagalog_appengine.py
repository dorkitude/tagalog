from tagalog import *
import logging

def log(message, tag_input='untagged'):
    
    if config['kill_switch']:
        return None
        
    message = format_message(message)
    date_string = get_date_string()

    loggable_tags = get_loggable_tags(tag_input)

    return_me = False
    
    for tag in loggable_tags:
        write_me = "%s [ %s ] %s" % (date_string, tag, message)
        logging.info(write_me)
        return_me = True
        
    return return_me
