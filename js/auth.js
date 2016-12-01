function check_login(callback) {
    if (is_empty(Cookies.get('vex_username'))) {
        window.location.href = "login.php";
    } else {
        $.get(API_SERVER + "auth/detail/", function (data) {
            $(".username").html(data["username"]);
            if (callback) callback(data);
        }).fail(function () {
            window.location.href = "login.php";
        });
    }
}

function logout() {
    Cookies.remove("vex_username");
    Cookies.remove("vex_ticket");
    window.location.href = "index.php";
}

function change_password() {
    var html = "<div class='form-group'>";
    html += "<div class='input-group'>";
    html += "<span class='input-group-addon'>当前密码</span>";
    html += "<input type='password' id='change_password_old' class='form-control'/>";
    html += "</div>";
    html += "</div>";
    html += "<div class='form-group'>";
    html += "<div class='input-group'>";
    html += "<span class='input-group-addon'>新密码</span>";
    html += "<input type='password' id='change_password_new' class='form-control'/>";
    html += "</div>";
    html += "</div>";
    html += "<div class='form-group'>";
    html += "<div class='input-group'>";
    html += "<span class='input-group-addon'>再输入一次新密码</span>";
    html += "<input type='password' id='change_password_new_repeat' class='form-control'/>";
    html += "</div>";
    html += "</div>";
    bootbox.dialog({
        title: "修改密码",
        message: html,
        buttons: {
            "确定": function () {
                if ($("#change_password_new").val() != $("#change_password_new_repeat").val()) {
                    bootbox.alert(error_message("无法修改密码：两次输入的密码不一样，请重新输入！"), function () {
                        change_password();
                    });
                } else {
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: API_SERVER + "auth/password/",
                        data: {
                            username: Cookies.get('vex_username'),
                            old: CryptoJS.MD5($("#change_password_old").val()).toString(),
                            new: CryptoJS.MD5($("#change_password_new").val()).toString()
                        },
                        complete: function (xhr, ajaxOptions, thrownError) {
                            if (xhr.status >= 200 && xhr.status < 300) {
                                bootbox.hideAll();
                                bootbox.alert(success_message("密码修改成功！请重新登录。"), function () {
                                    logout();
                                });
                            } else {
                                var error_msg = "服务器无响应！";
                                switch (xhr.status) {
                                    case 406:
                                        error_msg = "新密码与旧密码相同！";
                                        break;
                                    case 401:
                                        error_msg = "当前密码错误！";
                                        break;
                                }
                                bootbox.hideAll();
                                bootbox.alert(error_message("无法修改密码：" + error_msg), function () {
                                    change_password();
                                });
                            }
                        }
                    });
                }
            }
        }
    });
}