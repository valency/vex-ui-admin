<html>
<head>
    <?php require_once "lib.php"; ?>
    <script type="text/javascript" src="js/login.js"></script>
</head>
<body class="login">
<div>
    <div class="login_wrapper">
        <div class="animate form login_form">
            <section class="login_content">
                <form action="javascript:login()">
                    <h1>Vex Control Center</h1>
                    <div>
                        <input id="username" type="text" class="form-control" placeholder="用户名"/>
                    </div>
                    <div>
                        <input id="password" type="password" class="form-control" placeholder="密码"/>
                    </div>
                    <div>
                        <button class="btn btn-default">登录</button>
                    </div>
                    <div class="clearfix"></div>
                    <div class="separator">
                        <p>(C) 2016 - 2017 Valency. All Rights Reserved.</p>
                        <p><a href="javascript:void(0)">Privacy & Terms</a></p>
                    </div>
                </form>
            </section>
        </div>
    </div>
</div>
</body>
</html>
