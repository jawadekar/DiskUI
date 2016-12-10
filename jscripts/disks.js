function debug_msg(str) {
  var id=document.getElementById('debug_div');
  id.innerHTML += '<br/>' + str;
}

function sendOp(cmd) {
  var url = '/cgi-bin/execdiskcmd.cgi';
  var params = cmd;
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.open("POST", url, false); 
  xmlhttp.setRequestHeader("Content-type", 
    "application/x-www-form-urlencoded");
  xmlhttp.setRequestHeader("Content-length", params.length);
  xmlhttp.setRequestHeader("Connection", "close");
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4) {
      debug_msg(xmlhttp.responseText);
    }
  }
  xmlhttp.send(params);
}

function checkClass(elm, cname) {
  var classStr = elm.className.split(' ');
  var i;
  for (i = 0; classStr[i]; i++) {
    if (classStr[i] == cname) {
      return true;
    }
  }
  return false;
}

function dskDropHandler(drgelm, drpelm, evt) {
  if (drgelm.parentNode != drpelm) {
    sendOp('move_disk=' + drgelm.id + '&source=' + drgelm.parentNode.id + '&destination=' + drpelm.id);
    drgelm.parentNode.removeChild(drgelm);
    drpelm.appendChild(drgelm);
  }
}

function dskOnDskHandler(drgelm, drpelm, evt) {
  if (drgelm.parentNode.id == drpelm.parentNode.id && 
      drgelm.parentNode.id == 'unassigned' &&
      !checkClass(drgelm, 'mirror')) {
    var pnode = drgelm.parentNode;
    var nstr = drgelm.id + "_" + drpelm.id;
    var nelm = document.createElement('div');
    var estr = '<img src="images/Mirror.png"/>' + nstr;
    nelm.id = nstr;
    nelm.className = "dsk mirror";
    nelm.innerHTML = estr;
    pnode.removeChild(drgelm);
    pnode.removeChild(drpelm);
    pnode.appendChild(nelm);
    new Draggable(nstr, {revert: true, ghosting: true});
  }
}
