var opened = {};
function openMenu(el, target, type, toggle_all) {
    if (opened[type] == null || opened[type][0] != el || opened[type][1] != target) {
        if (opened[type] != null) {
            $(opened[type][0]).toggleClass('active');
            $(opened[type][1]).toggle();
        }
        opened[type] = {0:el, 1:target};
    } else if ($(el).hasClass('active')) {
        if (toggle_all) {
            opened[type] = null;
        } else {
            return
        }
    }
    $(el).toggleClass('active');
    $(target).toggle();
}

function xmlPostRequest(packet, params, target, onload) {
    var xml = new XMLHttpRequest();
    xml.onload = function () {
        if (xml.status == 200) {
            onload(true, xml.response)
        } else {
            console.log(xml.response);
            onload(false, xml.response)
        }
    };
    xml.open("POST", target);
    if (params.json) {
        xml.setRequestHeader("Content-Type", "application/json");
    } else if (params.responseType != null) {
        xml.responseType = params.responseType;
    }
    xml.send(packet);
}

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 *1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else {
        var expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length,c.length);
        }
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

function scriptOnloadHandler() {
    var scripts = document.getElementsByClassName("script-onload");
    while (scripts.length>0) {
        eval(scripts[0].innerHTML);
        scripts[0].parentNode.removeChild(scripts[0])
    }
}

function scriptOnloadRemover() {
    var scripts = document.getElementsByClassName("script-onload");
    while (scripts.length>0) {
        scripts[0].parentNode.removeChild(scripts[0])
    }
}
