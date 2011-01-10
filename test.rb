require './tagalog.rb'


Tagalog::log('my message', [:nice, :hello?])
hash = {
  :chunky => 'bacon!!!!!!!',
  :what? => 13511,
}
Tagalog::log(hash, [:tag1, :tag2])


Tagalog::log(hash, :off)


Tagalog::log('forced logging message', :force)


# TODO test for type-checking message

# TODO test for type-checking tagging