from python import tagalog


# nothing should happen:
# tagalog.config['kill_switch'] = True


# test array of tags
tagalog.log('my message', ['tag_1', 'tag_2', 'tag_3'])

# test dictionary inputs
my_dict = {
  'chunky' : 'bacon!!!!!!!',
  'what?' : 13511,
}

tagalog.log(my_dict, ['dictionary_test'])


# test a tag that's off
tagalog.log(my_dict, 'off')

# test a tag that's on
tagalog.log('forced logging message', 'force')

# test an unconfigured tag
tagalog.log("unconfigured_tag", 'unconfigured_tag')

# test default untagged case
tagalog.log('untagged message')


# uncomment to force a tag type exception:
# tagalog.log("message", {"unsupported" : "tag type"})

# uncomment to force a message type exception:
# import logging
# tagalog.log(logging, 'tag')

