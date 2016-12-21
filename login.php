<html>
<head>
    <?php require_once "lib.php"; ?>
    <link rel="stylesheet" type="text/css" href="css/login.css"/>
    <script type="text/javascript" src="js/login.js"></script>
</head>
<body class="login">
<div>
    <div class="login_wrapper">
        <div class="animate form login_form">
            <section class="login_content">
                <form action="javascript:login()">
                    <h1><img src="img/logo.png"/> Control Center</h1>
                    <input id="username" type="text" class="form-control" placeholder="用户名"/>
                    <input id="password" type="password" class="form-control" placeholder="密码"/>
                    <button class="btn btn-default">登录</button>
                    <div class="separator">
                        <p>(C) 2016 - 2017 Vex Group. All Rights Reserved.</p>
                    </div>
                </form>
            </section>
        </div>
    </div>
</div>
</body>
</html>
