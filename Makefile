all: diskui.cgi execdiskcmd.cgi

install: install_bin install_sh install_js install_img install_css

install_bin: diskui.cgi execdiskcmd.cgi
	cp diskui.cgi /usr/lib/cgi-bin/
	chmod +x /usr/lib/cgi-bin/diskui.cgi
	chmod +s /usr/lib/cgi-bin/diskui.cgi
	cp execdiskcmd.cgi /usr/lib/cgi-bin/
	chmod +x /usr/lib/cgi-bin/execdiskcmd.cgi
	chmod +s /usr/lib/cgi-bin/execdiskcmd.cgi

install_sh:
	cp getallinfo creatediskhtml *.sh /usr/lib/cgi-bin
	chmod +x /usr/lib/cgi-bin/getallinfo /usr/lib/cgi-bin/creatediskhtml
	chmod +x /usr/lib/cgi-bin/*.sh

diskui.cgi: diskui.c
	gcc -o diskui.cgi diskui.c

execdiskcmd.cgi: execdiskcmd.c
	gcc -o execdiskcmd.cgi execdiskcmd.c

install_js:
	cp jscripts/*.js /var/www/jscripts

install_css:
	cp css/*.css /var/www/css

install_img:
	cp images/* /var/www/images

clean:
	rm -f *.cgi
