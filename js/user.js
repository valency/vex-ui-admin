$(document).ready(function () {
    check_login();
    bootbox.dialog({
        message: loading_message("载入中..."),
        closeButton: false
    });
    $.get(API_SERVER + "auth/list/", function (resp) {
        for (var i = 0; i < resp.length; i++) {
            var user = resp[i];
            var html = "<tr>";
            var user_label = user["group"] == 1 ? "<span class='badge pull-right'>管理员</span>" : "";
            if (user["banned"]) user_label += "<span class='badge pull-right'>已禁用</span>";
            html += "<td>" + user["username"] + user_label + "</td>";
            html += "<td>" + user["email"] + "</td>";
            html += "<td>" + convert_django_time(user["register_time"]) + "</td>";
            html += "<td>" + convert_django_time(user["last_update"]) + "</td>";
            html += "<td>" + convert_django_time(user["last_login"]) + "</td>";
            html += "<td>" + user["ip"] + "</td>";
            html += "<td>¥ " + user["balance"].comma2() + "</td>";
            html += "<td>¥ " + user["balance_frozen"].comma2() + "</td>";
            html += "<td><button class='btn btn-xs btn-warning' onclick=\"reset_password('" + user["username"] + "');\"><i class='fa fa-edit'></i> 重置密码</button> ";
            var ban_btn = "<button class='btn btn-xs btn-danger' onclick=\"ban_user('" + user["username"] + "',true);\"><i class='fa fa-ban'></i> 禁用</button>";
            if (user["banned"]) ban_btn = "<button class='btn btn-xs btn-success' onclick=\"ban_user('" + user["username"] + "',false);\"><i class='fa fa-undo'></i> 取消禁用</button>";
            html += ban_btn + "</td>";
            html += "</tr>";
            $("#table-users tbody").append(html);
        }
        $("#table-users").DataTable({language: DT_LANG, stateSave: true});
        bootbox.hideAll();
    }).fail(function () {
        bootbox.hideAll();
        bootbox.alert(error_message("用户列表加载失败！"));
    });
});

function reset_password(username) {
    bootbox.confirm("确定要重置该用户的密码吗？", function (confirmation) {
        if (confirmation) {
            bootbox.dialog({
                message: loading_message("载入中..."),
                closeButton: false
            });
            var password_plain = CryptoJS.MD5("vex-" + (new Date()).getTime()).toString();
            var password_md5 = CryptoJS.MD5(password_plain).toString();
            $.ajax({
                type: "PUT",
                dataType: "json",
                url: API_SERVER + "auth/modify/",
                data: {
                    username: username,
                    field: "password",
                    value: password_md5
                },
                complete: function (xhr, ajaxOptions, thrownError) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        bootbox.hideAll();
                        bootbox.alert("<p>" + success_message("重置用户密码成功！请记录以下的用户名及密码，并于登录后修改密码：") + "</p><pre>USERNAME: " + username + "<br/>PASSWORD: " + password_plain + "</pre>", function () {
                            location.reload();
                        });
                    } else {
                        bootbox.hideAll();
                        bootbox.alert(error_message("重置用户密码失败！"), function () {
                            location.reload();
                        });
                    }
                }
            });
        }
    });
}

function ban_user(username, banned) {
    var s = banned ? "禁用" : "取消禁用";
    bootbox.confirm("确定要" + s + "该用户吗？" + (banned ? "禁用后该用户将无法登录。" : ""), function (confirmation) {
        if (confirmation) {
            bootbox.dialog({
                message: loading_message("载入中..."),
                closeButton: false
            });
            $.ajax({
                type: "PUT",
                dataType: "json",
                url: API_SERVER + "auth/modify/",
                data: {
                    username: username,
                    field: "banned",
                    value: banned ? "True" : "False"
                },
                complete: function (xhr, ajaxOptions, thrownError) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        bootbox.hideAll();
                        bootbox.alert(success_message(s + "用户成功！"), function () {
                            location.reload();
                        });
                    } else {
                        bootbox.hideAll();
                        bootbox.alert(error_message(s + "用户失败！"), function () {
                            location.reload();
                        });
                    }
                }
            });
        }
    });
}

function register() {
    var html = "<div class='form-group'>";
    html += "<div class='input-group'>";
    html += "<span class='input-group-addon'>用户名</span>";
    html += "<input id='register-username' class='form-control'/>";
    html += "</div>";
    html += "</div>";
    bootbox.dialog({
        title: "注册新用户",
        message: html,
        buttons: {
            "确定": function () {
                bootbox.dialog({
                    message: loading_message("载入中..."),
                    closeButton: false
                });
                var username = $("#register-username").val();
                var password_plain = CryptoJS.MD5("vex-" + (new Date()).getTime()).toString();
                var password_md5 = CryptoJS.MD5(password_plain).toString();
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: API_SERVER + "auth/register/",
                    data: {
                        username: username,
                        password: password_md5
                    },
                    complete: function (xhr, ajaxOptions, thrownError) {
                        bootbox.hideAll();
                        if (xhr.status >= 200 && xhr.status < 300) {
                            bootbox.alert("<p>" + success_message("注册用户成功！请记录以下的用户名及密码，并于登录后修改密码：") + "</p><pre>USERNAME: " + username + "<br/>PASSWORD: " + password_plain + "</pre>", function () {
                                location.reload();
                            });
                        } else {
                            bootbox.alert(error_message("注册用户失败！"), function () {
                                location.reload();
                            });
                        }
                    }
                });
            }
        }
    });
}