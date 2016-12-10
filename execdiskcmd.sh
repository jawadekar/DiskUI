#!/bin/bash

function disk_action()
{
    echo $1 >> /tmp/diskui.log
}

echo "Content-Type: text/html"
echo ""
disk_action $QUERY_STRING
echo "$QUERY_STRING"
echo "ok"
