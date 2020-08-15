package main

const INDEX = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Timewood</title>
<script src="https://d3js.org/d3.v5.min.js"></script>
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
<link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.grey-light_blue.min.css" />
<script src="https://code.getmdl.io/1.3.0/material.min.js"></script>
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
<div id="main-header" class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
  <header class="mdl-layout__header">
    <div class="mdl-layout__header-row" style="justify-content: space-between">
      <!-- Title -->
      <span class="mdl-layout-title" style="width: 100px">Timewood</span>

      <!-- Control Button Panel -->
      <div>
        <button id="button_previous" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored control-button">
          <i class="material-icons">skip_previous</i>
        </button>
        <button id="button_play" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored control-button" style="display: none">
          <i class="material-icons">play_arrow</i>
        </button>
        <button id="button_pause" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored control-button">
          <i class="material-icons">pause</i>
        </button>
        <button id="button_next" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored control-button">
          <i class="material-icons">skip_next</i>
        </button>
      </div>

      <!-- Tree Info -->
      <div style="display: flex; flex-direction: row">
        <div style="width: 200px">
          <div id="tree_tick_update">Tree Tick: 0</div>
          <div id="history_index"></div>
        </div>
        <button id="button_meta" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored control-button">
          <i class="material-icons">speaker_notes</i>
        </button>
      </div>
    </div>
  </header>
  <div class="mdl-layout__drawer" style="mdl-layout__drawer.is-visible{ width: 350px }">
    <span class="mdl-layout-title">Timewood</span>
    <nav class="mdl-navigation" id="tree-selection"></nav>
  </div>
  <main class="mdl-layout__content">
    <div class="page-content">
      <div id="tree-render-area"></div>
      <div id="meta-data-area" class="meta-area"></div>
    </div>
  </main>
</div>
</body>
<script>
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.createTemplateTagFirstArg=function(l){return l.raw=l};$jscomp.createTemplateTagFirstArgWithRaw=function(l,r){l.raw=r;return l};$jscomp.arrayIteratorImpl=function(l){var r=0;return function(){return r<l.length?{done:!1,value:l[r++]}:{done:!0}}};$jscomp.arrayIterator=function(l){return{next:$jscomp.arrayIteratorImpl(l)}};$jscomp.makeIterator=function(l){var r="undefined"!=typeof Symbol&&Symbol.iterator&&l[Symbol.iterator];return r?r.call(l):$jscomp.arrayIterator(l)};
(function(){function l(){z=!0;q=[];m=t.length-1;if(-1!=m)for(var a=0;a<t.length;a++){var b=a;120==t.length&&(b=(a+u+1)%120);q.push(t[b])}}function r(a,b){d3.select("#history_index").text("Tree History: "+(b+1)+" of "+a.length)}function B(a,b){function e(g){var p=g.name;if(Array.isArray(g.params))for(var v=$jscomp.makeIterator(g.params),y=v.next();!y.done;y=v.next())p+=":"+y.value;if(Array.isArray(g.args))for(g=$jscomp.makeIterator(g.args),v=g.next();!v.done;v=g.next())p+=":"+v.value;return p}for(var n=
{},h=$jscomp.makeIterator(b),k=h.next();!k.done;k=h.next())k=k.value,n[e(k)]=k;h={};k=$jscomp.makeIterator(a);for(var d=k.next();!d.done;h={$jscomp$loop$prop$to$8$11:h.$jscomp$loop$prop$to$8$11},d=k.next())if(d=d.value,d.element){var c=e(d);h.$jscomp$loop$prop$to$8$11=n[c];h.$jscomp$loop$prop$to$8$11&&(h.$jscomp$loop$prop$to$8$11.element||(h.$jscomp$loop$prop$to$8$11.element=F(h.$jscomp$loop$prop$to$8$11)),c=d.element.attr("scaling"),h.$jscomp$loop$prop$to$8$11.element.style("display",d.element.style("display")).style("top",
d.element.style("top")).style("left",d.element.style("left")).attr("scaling",c).style("transform","scale("+c+")"),d.element.remove(),d3.select("#tree-render-area").append(function(g){return function(){return g.$jscomp$loop$prop$to$8$11.element.node()}}(h)))}}function C(){z?(d3.select("#button_pause").style("display","none"),d3.select("#button_play").style("display","inline-block")):(d3.select("#button_play").style("display","none"),d3.select("#button_pause").style("display","inline-block"))}function D(a){var b=
d3.select("#meta-data-area").html("").call(d3.drag().on("drag",function(){var h=d3.event;b.node();var k=parseInt(b.style("top")),d=parseInt(b.style("left"));b.attr("draggable",!0).style("top",k+h.dy+"px").style("left",d+h.dx+"px")})),e;for(e in a.meta){var n=b.append("div").classed("meta-element",!0);n.append("span").text(e);n.append("span").style("margin-left","10px").text(a.meta[e])}d3.select("#tree-selection").html("").selectAll("a").data(a.trees).join(function(h){h=h.append("a").classed("mdl-navigation__link",
!0);var k=h.append("label").attr("for",function(d,c){return"switch-"+c}).classed("mdl-switch mdl-js-switch mdl-js-ripple-effect",!0);k.append("input").attr("type","checkbox").attr("id",function(d,c){return"switch-"+c}).classed("mdl-switch__input",!0).on("change",function(d){d.element?d3.event.target.checked?d.element.style("display","block"):d.element.style("display","none"):(d.element=F(d),d.element.style("display","block"),d3.select("#tree-render-area").append(function(){return d.element.node()}))});
k.append("span").classed("mdl-switch__label",!0).text(function(d){return G(d)});k.each(function(){componentHandler.upgradeElement(d3.select(this).node())});k.classed("is-checked",function(d){return d.element&&"block"==d.element.style("display")?!0:!1});return h})}function G(a){var b=a.params;a.args&&0<a.args.length&&(b=a.args);if(b&&0<b.length){var e=a.name+":";b=$jscomp.makeIterator(b);for(var n=b.next();!n.done;n=b.next())e+=" "+H(n.value,a.max_arg_length,a.long_arg_trunc);return e}return a.name}
function H(a,b,e){return b&&e&&a.length>=b?a.substring(0,e):a}function F(a){var b=d3.select(document.createElement("div")).style("position","absolute").style("width","400px").style("top","0px").style("left","0px").attr("scaling",1);b.append("div").text(G(a));b.append(function(){return J(a).node()});b.call(d3.drag().on("drag",function(){var e=d3.event;b.node();var n=parseInt(b.style("top")),h=parseInt(b.style("left"));b.attr("draggable",!0).style("top",n+e.dy+"px").style("left",h+e.dx+"px")}));b.on("wheel",
function(){var e=d3.event;e.shiftKey&&(e=e.deltaY/100,e=parseFloat(b.attr("scaling"))+e,b.attr("scaling",e).style("transform","scale("+e))});return b}function E(a,b){var e="#010101",n="#FFF";if(a.id==b)switch(a.result){case 0:e="#A80B00";n="#F7AEA9";break;case 1:e="#007300";n="#B4DFB4";break;case 2:e="#044993",n="#AEB8EC"}return[e,n]}function J(a){var b=a.root.id,e=a.max_arg_length,n=a.long_arg_trunc,h=0,k=d3.hierarchy(a.root).eachBefore(function(c){return c.index=h++});a=k.descendants();var d=d3.create("svg").attr("viewBox",
[-9,-9,400,18*(a.length+1)]).attr("font-family","sans-serif").attr("font-size",10).style("overflow","visible");k=k.links();k.sort(function(c,g){if(c.source.depth<g.source.depth)return-1;if(c.source.depth>g.source.depth)return 1;var p=c.target.data;return p.id!=b?-1:c.source.data.result==p.result?1:0});d.append("g").attr("fill","none").attr("stroke-width","1.5").selectAll("path").data(k).join("path").attr("stroke",function(c){c=c.target.data;if(c.id!=b)return"#999";c=$jscomp.makeIterator(E(c,b));var g=
c.next().value;c.next();return g}).attr("d",function(c){return"\n        M"+18*c.source.depth+","+18*c.source.index+"\n        V"+18*c.target.index+"\n        h18\n      "});d.append("g").selectAll("g").data(a).join("g").attr("transform",function(c){return"translate(0,"+18*c.index+")"}).each(function(c){var g=c.data;if(g.children){var p=$jscomp.makeIterator(E(g,b));c=p.next().value;p=p.next().value;d3.select(this).append("circle").attr("cx",function(f){return 18*f.depth}).attr("r",7.5).attr("stroke",
c).attr("stroke-width","1.2").attr("fill",p);d3.select(this).append("text").attr("dy","0.3em").attr("x",function(f){return 18*f.depth}).attr("text-anchor","middle").attr("fill",c).style("font-weight","bolder").style("font-size","0.85em").text(function(f){return f.data.name});if(g.args&&0<g.args.length){p="";for(var v=$jscomp.makeIterator(g.args),y=v.next();!y.done;y=v.next())p+=y.value+" ";d3.select(this).append("text").attr("dy","0.3em").attr("x",function(f){return 18*f.depth+10}).attr("fill",c).style("font-weight",
"bolder").style("font-size","0.85em").text(p)}}else c=void 0,c=g.isAction?d3.select(this).append("rect").attr("x",function(f){return 18*f.depth-3.5}).attr("y",-3.5).attr("width",7).attr("height",7):d3.select(this).append("circle").attr("cx",function(f){return 18*f.depth}).attr("r",3.5),c.attr("fill",function(f){if(g.id!=b)return"#999";f=$jscomp.makeIterator(E(g,b));var x=f.next().value;f.next();return x}),d3.select(this).append("text").attr("dy","0.32em").attr("x",function(f){return 18*f.depth+6}).text(function(f){var x=
f.data;f=f.data.name;if(x.params&&0<x.params.length){f+=": ";if(x.id==b)for(var A=$jscomp.makeIterator(x.args),w=A.next();!w.done;w=A.next())w=H(w.value,e,n),f+=w+" ";else for(A=$jscomp.makeIterator(x.params),w=A.next();!w.done;w=A.next())f+=w.value+" ";f=f.substring(0,f.length-1)}return f=x.isAction?"["+f+"]":"("+f+")"})});return d}var t=[],u=-1,q=[],m=-1,z=!1,I=0;d3.select("#button_previous").on("click",function(){z||(l(),C());if(0<m){var a=q[m];m--;B(a.trees,q[m].trees);D(q[m]);r(q,m)}});d3.select("#button_next").on("click",
function(){z||(l(),C());if(m<q.length-1){var a=q[m];m++;B(a.trees,q[m].trees);D(q[m]);r(q,m)}});d3.select("#button_play").on("click",function(){var a=void 0;-1<m&&(a=q[m]);z=!1;m=-1;C();d3.select("#history_index").text("");if(-1<u){var b=t[u];a&&B(a.trees,b.trees);D(b)}});d3.select("#button_pause").on("click",function(){l();C();r(q,m)});d3.select("#button_meta").on("click",function(){var a=d3.select("#meta-data-area");"none"==a.style("display")?a.style("display","block"):a.style("display","none")});
window.gooey.OnMessage=function(a){var b=JSON.parse(a);a=void 0;-1!=u&&(a=t[u]);120>t.length?(t.push(b),u++):(u=(u+1)%120,t[u]=b);I++;d3.select("#tree_tick_update").text("Tree Tick: "+I);z||(b=t[u],a&&B(a.trees,b.trees),D(b))};var K=document.getElementById("main-header");componentHandler.upgradeElement(K)})();
</script>
</html>
`
