package main

const INDEX = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Timewood</title>
<script defer src="https://d3js.org/d3.v5.min.js"></script>
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
<link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.grey-light_blue.min.css" />
<script defer src="https://code.getmdl.io/1.3.0/material.min.js"></script>
<style>
  .mdl-layout__drawer.is-visible { width: 35vw; }
  .control-button { transform: scale(0.8); }
  .meta-area {
      position   : absolute;
      z-index    : 100;
      display    : none;
      box-shadow : 2px 2px 2px gray;
      border     : 1px solid gray;
      top        : 20px;
      left       : 30px;
      padding    : 6px;
      min-width  : 150px;
      background : white;
      z-index    : 10;
  }
  .meta-element {
      display         : flex;
      justify-content : space-between;
  }
</style>
<script>
(function(){var e=window.location.origin.substring(7),d=new WebSocket("ws://"+e+"/gooeywebsocket"),a=void 0;window.hasOwnProperty("gooey")?a=window.gooey:(a={},window.gooey=a,a.OnMessage=function(a){console.log(a)},a.Send=function(a){1===d.readyState?d.send(JSON.stringify(a)):console.error("[GOOEY] Websocket connection is not open.")},a.IsDisconnected=!1,a.OnOpen=function(){console.log("[GOOEY] Websocket connection is open.")},a.OnDisconnect=function(){console.error("[GOOEY] Disconnected from server.")},
a.OpenNewTab=function(){var a=new XMLHttpRequest;a.open("GET",window.location+"gooeynewtab",!0);a.send()});var f=window.setInterval(function(){3===d.readyState&&(window.clearInterval(f),a.IsDisconnected=!0,a.OnDisconnect())},1500);d.addEventListener("open",function(){a.IsDisconnected=!1;a.OnOpen()});d.addEventListener("message",function(d){var b=JSON.parse(d.data);if(b.hasOwnProperty("GooeyMessage")&&b.hasOwnProperty("GooeyContent")&&"gooey-server-reload-content"===b.GooeyMessage){d=function(a){var b=
document.createElement("script");b.id="gooey-reload-js-content";b.innerHTML=a;document.head.appendChild(b)};b=b.GooeyContent;if(""!==b.Body){document.body.innerHTML=b.Body;var c=document.getElementById("gooey-reload-js-content");c&&(document.head.removeChild(c),d(c.innerHTML))}""!==b.CSS&&((c=document.getElementById("gooey-reload-css-content"))?c.innerHTML=b.CSS:(c=document.createElement("style"),c.id="gooey-reload-css-content",c.innerHTML=b.CSS,document.head.appendChild(c)));""!==b.Javascript&&((c=
document.getElementById("gooey-reload-js-content"))&&document.head.removeChild(c),d(b.Javascript))}else a.OnMessage(b)})})();
</script>
</head>
<body>
<h1>Timewood</h1>
</body>
</html>
`
