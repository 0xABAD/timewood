(function() {
    window.gooey.OnMessage = function(msg) {
        // Check we can act on gooey messages.
        let elt = document.getElementById('gooey-message-area');
        elt.innerText = msg;

        // Check d3.js is working.
        d3.select('#d3-version').text(d3.version);
    };

    // Reset MDL framework in case of hot-reload.
    let header = document.getElementById('main-header');
    componentHandler.upgradeElement(header);
})();
