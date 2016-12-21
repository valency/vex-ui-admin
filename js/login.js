function login() {
    var username = $("#username").val();
    var password = CryptoJS.MD5($("#password").val()).toString();
    $.ajax({
        type: "GET",
        url: API_SERVER + "auth/login/",
        data: {
            username: username,
            password: password
        },
        success: function (data) {
            Cookies.set('vex_username', username);
            Cookies.set('vex_ticket', data["ticket"]);
            var r = get_url_parameter("callback");
            if (is_empty(r)) r = ".";
            window.location.href = r;
        },
        error: function (xhr, ajaxOptions, thrownError) {
            var error_msg = "服务器无响应！";
            switch (xhr.status) {
                case 401:
                    error_msg = "用户名或密码错误！";
                    break;
                case 403:
                    error_msg = "该用户禁止访问本系统！";
                    break;
                case 406:
                    error_msg = "用户名或密码为空或不符合要求！";
                    break;
            }
            bootbox.alert(error_message(error_msg));
        },
        dataType: "json"
    });
}

function register() {
    var username = $("#username").val();
    var password = $("#password").val();
    if (!is_empty(username) && !is_empty(password)) {
        $.ajax({
            type: "POST",
            url: API_SERVER + "auth/register/",
            data: {
                username: username,
                password: CryptoJS.MD5(password).toString()
            },
            dataType: "json"
        }).always(function (xhr) {
            switch (xhr.status) {
                case 201:
                    var msg = success_message("注册成功！");
                    break;
                case 406:
                    msg = error_message("注册失败：用户名或密码不符合要求！");
                    break;
                case 409:
                    msg = error_message("注册失败：用户已存在！");
                    break;
                default:
                    msg = error_message("注册失败：服务器无响应！");
            }
            bootbox.alert(msg);
        });
    } else {
        bootbox.alert(error_message("注册失败：用户名或密码不能为空！"));
    }
}