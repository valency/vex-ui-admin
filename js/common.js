Number.prototype.comma = function () {
    return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

Number.prototype.comma2 = function () {
    return this.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


function success_message(msg) {
    return "<span class='text-success'><i class='fa fa-check-circle'></i> " + msg + "</span>";
}

function error_message(msg) {
    return "<span class='text-danger'><i class='fa fa-times-circle'></i> " + msg + "</span>";
}

function warning_message(msg) {
    return "<span class='text-warning'><i class='fa fa-exclamation-circle'></i> " + msg + "</span>";
}

function loading_message(msg) {
    return "<span class='text-info'><i class='fa fa-spin fa-spinner'></i> " + msg + "</span>";
}

function get_url_parameter(p) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == p) {
            return sParameterName[1];
        }
    }
}

function redirect_with_parameters(parameters) {
    var l = window.location;
    var params = {};
    var x = /(?:\??)([^=&?]+)=?([^&?]*)/g;
    var s = l.search;
    for (var r = x.exec(s); r; r = x.exec(s)) {
        r[1] = decodeURIComponent(r[1]);
        if (!r[2]) r[2] = '%%';
        params[r[1]] = r[2];
    }
    for (var i = 0; i < parameters.length; i++) {
        params[parameters[i][0]] = encodeURIComponent(parameters[i][1]);
    }
    var search = [];
    for (var j in params) {
        var p = encodeURIComponent(j);
        var v = params[j];
        if (v != '%%') p += '=' + v;
        search.push(p);
    }
    search = search.join('&');
    l.search = search;
}

function convert_django_time(t) {
    if (t != null) return t.substring(0, 19).replace("T", " ");
    else return null;
}

function is_empty(s) {
    return s == undefined || s == null || s == "";
}

