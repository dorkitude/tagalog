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
Tagalog::log('my message', array('nice', 'hello?'));

// test dictionary inputs
$my_dict = array(
  'chunky' => 'bacon!!!!!!!',
  'what?' => 13511,
);

Tagalog::log($my_dict, array('tag_3', 'tag_2', 'tag_1'));


// test a tag that's off
Tagalog::log($my_dict, 'off');

// test a tag that's on
Tagalog::log('forced logging message', 'force');

// test default case
Tagalog::log('untagged message', 'untagged');