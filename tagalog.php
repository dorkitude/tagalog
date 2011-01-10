<?php


    class Tagalog {
        
        public static $config = array(
            // this path can be relative or absolute
            "log_file_path" => "/var/log/tagalog.log",
            
            // set this to true if you want ALL logging turned off:
            "kill_switch" => false,
            
            // turn tags on and off here:
            "tags" => array( 
                "tag_1" => true,
                "tag_2" => true,
                "tag_3" => true,
                "off" => false,
                "force" => true,
                
                // the default tag:
                "untagged" => true, // this one is special
            ),
        );

        
        // @param $message - mixed - an array that can be json-serialized or anything that can be cast as a string
        // @param $taggin - mixed - a tag string or an array of tag strings
        // @return boolean - whether or not logging occurred
        public static function log($message, $tagging = 'untagged') {
            $config = self::$config;
            
            // abort if kill switch is on
            if(self::isKillSwitchOn()) {
                return false;
            }
            
            // abort if there are no valid, turned-on tags
            if(!$tags = self::getTagList($tagging)) { // empty arrays evaluate to false
                return false;
            }
            
            $path = self::getAbsolutePath();
            $message = self::formatMessage($message);
            $dateString = date('Y-m-d @ H:i:s');

            $returnMe = false;
            
            foreach($tags as $tag) {
                $logMessage = "{$dateString} [ {$tag} ] {$message}\n";
                if(!$attempt = error_log($logMessage, 3, $path)) {
                    throw new TagalogException("tagalog ran into this php error when trying to write to log:" . $php_errormsg );
                }
                
                $returnMe = true;
            }
            
            return $returnMe;
        }
        
        // @return string
        private static function formatMessage($message) {
            // serialize arrays
            if (is_array($message)) {
                $message = print_r($message, true);    
            }
            else {
                try {
                    $message = (string) $message;
                }
                catch (Exception $e) {
                    throw new TagalogException("Tagalog couldn't cast your 'message' input as a string: " . $e->getMessage());
                }
            }
            
            return $message;
        }

        // @return string
        private static function getAbsolutePath() {
            $path = self::$config["log_file_path"];
            
            // create absolute path from relative path, if necessary:
            if (substr($path, 0, 1) != '/') {
                $path = dirname(__FILE__) . "/" . $path;
            }
            return $path;
        }
     
        // @return boolean
        private static function isKillSwitchOn() {
            return self::$config['kill_switch'];
        }
     
        // @return array
        private static function getTagList($tagging) {
            if(!is_array($tagging)) {
                if(is_string($tagging)) {
                    if(self::isTagTurnedOn($tagging)) {
                        $tags = array($tagging);
                    }
                    else {
                        $tags = array();
                    }
                }
                else {
                    throw new TagalogException("bad tagalog input: 'tagging' must be either a string or an array of strings.");
                }
            }
            else {
                $tags = array();
                foreach($tagging as $tag) {
                    if(!is_string($tag)) {
                        throw new TagalogException("bad tagalog input: each element in 'tagging' array must be a string.");
                    }
                    
                    if(self::isTagTurnedOn($tag)) {
                        $tags[] = $tag;
                    }
                }
            }
            
            return $tags;
        }
        
        // @return boolean
        private static function isTagTurnedOn($tag) {
            $config = self::$config;
            
            // if the tag doesn't exist in config, assume logging is on
            if(!isset($config['tags'][$tag])) {
                return true;
            }
            
            return ($config['tags'][$tag]);
        }


        
    } // end Tagalog

    class TagalogException extends Exception {
    }


/* 
<looky here, full docs!>

    How to use tagalog.php:
    
        1. Modify the $config associative array to suit your fancy
        2. Log something in your app code, like this:  Tagalog::log("Sup world!", "myTag") or this: Tagalog::log("Sup world!", array('tag1', 'tag2', 'tag3'))
        3. In terminal, do "tail -f <pathToLogFile>" (without the less-than and greater-than signs)



    Example of how TAGS work:
    
        If this were your $config:
            
            protected static $config = array(
                "log_file_path" => "/var/log/tagalog.log",
                "kill_switch" => false,
                "tags" => array( 
                    "chunky" => true,
                    "bacon" => false,
                ),
            );
        
        Then a call to Tagalog::log("Sup werld", "chunky") would actually write to the log,
            since you send the "chunky" tag name, and logging for that tag is turned on
        But a call to Tagalog::log("Not much u?", "bacon") would not write to anything,
            because logging for the tag "bacon" is set to false.
*/

/*    
    <license stuff>
    
    tagalog is licensed under The MIT License

    Copyright (c) 2010 Kyle Wild (dorkitude) - available at http://github.com/dorkitude/tagalog

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
    
    </license stuff>
*/