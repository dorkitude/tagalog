#! /bin/bash

echo "--------- begin PHP ---------" >> /var/log/tagalog.log
echo "testing PHP..."
php test.php
echo "done!"
echo "--------- endof PHP ---------" >> /var/log/tagalog.log

echo "--------- begin Python ---------" >> /var/log/tagalog.log
echo "testing Python..."
python test.py
echo "done!"
echo "--------- endof Python ---------" >> /var/log/tagalog.log

#echo "--------- begin Ruby ---------" >> /var/log/tagalog.log
#echo "testing Ruby..."
#ruby test.rb
#echo "done!"
#echo "--------- endof Ruby ---------" >> /var/log/tagalog.log




