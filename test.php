<?

require_once('tagalog.php');


// nothing should happen:
// Tagalog::$config['kill_switch'] = true;

// force a tag type exception
// Tagalog::log("message", {"unsupported" : "tag type"})


// force a message type exception
// import logging
// Tagalog::log(logging, 'tag')


// test array of tags
Tagalog::log('my message', array('tag_1', 'tag_2', 'tag_3'));

// test associonary inputs
$my_assoc = array(
  'chunky' => 'bacon!!!!!!!',
  'what?' => 13511,
);

Tagalog::log($my_assoc, 'assoc_test');


// test a tag that's off
Tagalog::log($my_assoc, 'off');

// test a tag that's on
Tagalog::log('forced logging message', 'force');

# test default untagged case
Tagalog::log('untagged message');