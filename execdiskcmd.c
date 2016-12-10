#include <stdio.h> 
#include <stdlib.h>
#include <unistd.h>
#include <string.h>

main(int ac, char **av) 
{ 
    char *env_val=NULL;
    char *content_length_str=NULL;
    unsigned content_length=0;
    char *post_buffer=NULL;
    char shell_cgi_buffer[50];
    char cmd_buffer[100];
    int i, j, k, equal_found=0;

    setuid(0); 
    setgid(0); 
    if ((content_length_str=getenv("CONTENT_LENGTH")) != NULL) {
	/* POST method is being used */
	sscanf(content_length_str, "%d", &content_length);
	if((env_val=(char*)malloc(content_length+1))==NULL){
	    fprintf(stderr, "Fatal Error: Cannot allocate memory\n");
	    exit(1);
	}
	if (fread(env_val, 1, content_length, stdin) != content_length) {
	    fprintf(stderr, "Fatal Error: Cannot read POST data\n");
	    exit(1);
	}
	env_val[content_length]='\0';
	if (setenv("QUERY_STRING", env_val, 1)!=0) {
	    fprintf(stderr, "Fatal Error: Cannot setenv QUERY_STRING\n");
	    exit(1);
	}
    }
    execv("/usr/lib/cgi-bin/execdiskcmd.sh",av); 
}
