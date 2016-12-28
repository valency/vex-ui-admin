<html>
<head>
    <?php require_once "lib.php"; ?>
    <script type="text/javascript" src="js/stock.js"></script>
</head>
<body class="nav-md footer_fixed">
<div class="container body">
    <div class="main_container">
        <?php require_once "menu.php"; ?>
        <?php require_once "header.php"; ?>
        <!-- page content -->
        <div class="right_col" role="main">
            <div class="x_title">
                <h3>交易目录管理</h3>
            </div>
            <div class="row">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div>
                        <button class="btn btn-primary" type="button" onclick="register()">添加新交易项目</button>
                    </div>
                    <hr/>
                    <table id="table-users" class="table table-hover table-condensed">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>交易项目名称</th>
                            <th>开放交易时间</th>
                            <th>最近更新时间</th>
                            <th>最近登录时间</th>
                            <th>最近登录 IP</th>
                            <th>余额</th>
                            <th>冻结余额</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
        <?php require_once "footer.php"; ?>
    </div>
</div>
</body>
</html>
