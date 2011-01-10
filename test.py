import tagalog


# nothing should happen:
# tagalog.config['kill_switch'] = True


# force a tag type exception
# tagalog.log("message", {"unsupported" : "tag type"})


# force a message type exception
# import logging
# tagalog.log(logging, 'tag')


# test array of tags
tagalog.log('my message', ['nice', 'hello?'])

# test dictionary inputs
my_dict = {
  'chunky' : 'bacon!!!!!!!',
  'what?' : 13511,
}

tagalog.log(my_dict, ['tag_1', 'tag_2', 'tag_3'])


# test a tag that's off
tagalog.log(my_dict, 'off')

# test a tag that's on
tagalog.log('forced logging message', 'force')

# test default case
tagalog.log('untagged message')