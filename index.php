<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Browser Selector Test</title>
    <style>
        body {
            background: rgb(220,220,220);
            font: normal normal 1em/1.2em Helvetica,Arial,sans-serif;
        }
        .wrap {
            max-width: 960px;
            margin: 0 auto;
            padding: 15px;
            background: rgb(250,250,250);
        }
        li.ie, .ie .detected { background-color: yellow; }
        li.ie7, .ie7 .detected { background-color: orange }
        li.gecko, .gecko .detected { background-color: gray; }
        li.win.gecko, .win.gecko .detected { background-color: red; }
        li.linux, .linux.gecko .detected { background-color: pink; }
        li.opera, .opera .detected { background-color: green; }
        li.konqueror, .konqueror .detected { background-color: blue; }
        li.webkit, .webkit .detected { background-color: rgb(149, 61, 245); }
        li.chrome, .chrome .detected { background-color: cyan; }
        .detected {
            display: inline-block;
            padding: 2px 10px;
            font-size: 80%;
        }
        .legend {
            display: inline-block;
            padding-left: 20px;
            list-style: none;
        }
        .legend li {
            padding: 2px 10px;
        }
    </style>
</head>
<body>

<div class="wrap">
    <h1>This page is designed to test the browser detection script</h1>

    <div style="padding-left: 20px;"><p class="detected">USER AGENT STRING:<br /><?php echo isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : ''; ?></p></div>

    <div>
        <ul class="legend">
            <li style="border-bottom: 1px solid black;"><strong>Legend</strong></li>
            <li class="ie">IE</li>
            <li class="ie7">IE7</li>
            <li class="gecko">Gecko</li>
            <li class="win gecko">Windows Gecko</li>
            <li class="linux gecko">Linux Gecko</li>
            <li class="opera">Opera Gecko</li>
            <li class="konqueror">Konqueror</li>
            <li class="webkit">Webkit</li>
            <li class="chrome">Chrome</li>
        </ul>
    </div>

    <div>
        <ul id="classy" style="display:inline-block;">
            <li style="list-style: none; border-bottom: 1px solid black;"><h4 style="margin:0;">List of classes applied</h4></li>
        </ul>
    </div>
</div>


<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="css_browser_selector_dev.js"></script>

<script>
        var classList = document.documentElement.className.split(/\s+/);
        var items = document.getElementById("classy");

        function writeClasses() {
            for (var i = 0; i < classList.length; i++) {
                var item = document.createElement("li");
                item.innerHTML = classList[i];
                items.appendChild(item);
            }
        }

        writeClasses();

</script>

</body>
</html>