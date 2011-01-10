import tagalog


# nothing should happen:
# tagalog.config['kill_switch'] = True


# force a tag type exception
# tagalog.log("message", {"unsupported" : "tag type"})

# force a message type exception
# import logging
# tagalog.log(logging, 'tag')


tagalog.log('my message', ['nice', 'hello?'])

my_dict = {
  'chunky' : 'bacon!!!!!!!',
  'what?' : 13511,
}

tagalog.log(my_dict, ['tag_3', 'tag_2', 'tag_1'])


tagalog.log(my_dict, 'off')


tagalog.log('forced logging message', 'force')