require 'json'

class Tagalog
  
  # configure this inline or extend and override
  @@config = {
    # this path can be relative or absolute
    :log_file_path => "/var/log/tagalog.log",
    
    # set this to true if you want ALL logging turned off:
    :kill_switch => false,

    # turn tags on and off here:
    :tags =>  {
      :sup => false,
      :tag_2 => false,
      :tag_3 => true,
      :off => false,
    }
  }
  
  # @param message - mixed - something that can be cast as a string -- JSON for hashes/arrays coming soon 
  # @param tagging - mixed - a tag symbol or an array of tag symbols
  # @return boolean - whether or not logging occurred
  def self.log(message, tagging=:untagged)
    return false if @@config[:kill_switch]

    loggable_tags = self.get_loggable_tags tagging
    return false if loggable_tags.empty?
    
    message = self.format_message message
    
    time_string = Time.now.strftime("%Y-%m-%d @ %H:%m:%S")
    
    for tag in loggable_tags
      this_message = "#{time_string} [ #{tag} ]  #{message}"
      self.write_message this_message
    end
    return true
  end
  
  def self.format_message message
    if message.class == Hash || message.class == Array
      message = message.to_json
    end
  end
  

  def self.write_message message
    path = @@config[:log_file_path]

    # turn absolute paths into relative ones
    if path[0,1] != '/'
      path = File.dirname(__FILE__) + '/' + path
    end
    
    open(path, 'a') { |f|
      f.puts message
    }
  end # /self.log
  

  def self.get_loggable_tags(tagging)
    if tagging.class == Symbol
      tags = []
      tags = [tagging] unless @@config[:tags].has_key?(tagging) && !@@config[:tags][tagging]
    elsif tagging.class == Array
      # filter out any tags that are set to false in the config
      tags = tagging.select {|tag| !(@@config[:tags].has_key?(tag) && !@@config[:tags][tag] )}
    else
      raise TagalogException, "tagging must be a symbol or an array."
    end

    return tags
  end # /self.get_loggable_tags
  
end  # /class Tagalog


class TagalogException < Exception
  # pass
end








# <license stuff>
# 
# tagalog.rb is licensed under The MIT License
# 
# Copyright (c) 2010 Kyle Wild (dorkitude) - available at http://github.com/dorkitude/tagalog
# 
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
# 
# </license stuff>
