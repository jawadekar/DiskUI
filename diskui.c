#include <stdio.h> 
#include <stdlib.h>
#include <unistd.h>
#include <string.h>

main(int ac, char **av) 
{ 
    setuid(0); 
    setgid(0); 
    execv("/usr/lib/cgi-bin/creatediskhtml", av); 
}
