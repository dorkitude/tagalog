require './tagalog.rb'


# test array of tags
Tagalog::log('my message', [:tag_1, :tag_2, :tag_3])

# test dictionary inputs
hash = {
  :chunky => 'bacon!!!!!!!',
  :what? => 13511,
}
Tagalog::log(hash, [:hashtest])


# test a tag that's off
Tagalog::log(hash, :off)

# test a tag that's on
Tagalog::log('forced logging message', :force)

# test an unconfigured tag
Tagalog::log("unconfigured_tag", :unconfigured_tag)

# test default untagged case
Tagalog::log('untagged message')


# test a symbol message
Tagalog::log(:my_symbol_message, :ruby_only)


# uncomment to force a tag type exception:
# Tagalog::log("message", {:unsupported => 'tag type'})

# uncomment to force a message type exception:
# Tagalog::log(Time, :tag)