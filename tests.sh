
echo "testing PHP"

echo "--------- begin PHP ---------" >> /var/log/tagalog.log
php test.php
echo "--------- endof PHP ---------" >> /var/log/tagalog.log

echo "--------- begin Python ---------" >> /var/log/tagalog.log
echo "testing Python"
python test.py
echo "--------- begin Python ---------" >> /var/log/tagalog.log

echo "--------- begin Ruby ---------" >> /var/log/tagalog.log
echo "testing Ruby"
ruby test.rb
echo "--------- begin Ruby ---------" >> /var/log/tagalog.log




