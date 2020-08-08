(function() {
    const debugTrees = [
        {
            "name": "gather",
            "params": ["*room"],
            "args": ["sim"],
            "id": 47,
            "result": 0,
            "max_arg_length": 24,
            "long_arg_trunc": 6,
            "root": {
                "name": "⇶",
                "result": 0,
                "args": [2],
                "id": 47,
                "children": [
                    {
                        "name": "?",
                        "result": 0,
                        "id": 47,
                        "children": [
                            {
                                "name": "Room Max Level",
                                "params": ["*room"],
                                "args": ["sim"],
                                "result": 0,
                                "id": 47
                            },
                            {
                                "name": "➝",
                                "result": 0,
                                "id": 47,
                                "children": [
                                    {
                                        "name": "Carry Creep Available",
                                        "params": ["?creep", "*room"],
                                        "args": ["76d162e718c9f1ab51413dfc", "sim"],
                                        "result": 1,
                                        "id": 47
                                    },
                                    {
                                        "name": "!",
                                        "result": 0,
                                        "id": 47,
                                        "children": [
                                            {
                                                "name": "Creep Energy Full",
                                                "params": ["*creep"],
                                                "args": ["76d162e718c9f1ab51413dfc"],
                                                "result": 1,
                                                "id": 47
                                            }
                                        ]
                                    },
                                    {
                                        "name": "Spawn Energy Near Full",
                                        "params": ["?spawn"],
                                        "args": ["?spawn"],
                                        "result": -1,
                                        "id": -1
                                    },
                                    {
                                        "name": "Creep Collect Energy",
                                        "params": ["*creep", "*spawn"],
                                        "args": ["*creep", "*spawn"],
                                        "result": -1,
                                        "id": -1,
                                        "isAction": true
                                    }
                                ]
                            },
                            {
                                "name": "➝",
                                "result": 0,
                                "id": 47,
                                "children": [
                                    {
                                        "name": "Have Creep With Energy",
                                        "params": ["?creep", "*room"],
                                        "args": ["76d162e718c9f1ab51413dfc", "sim"],
                                        "result": 1,
                                        "id": 47
                                    },
                                    {
                                        "name": "Spawn Energy Near Full",
                                        "params": ["?spawn", "*room"],
                                        "args": ["988056402dad25aba66e5af5", "sim"],
                                        "result": 0,
                                        "id": 47
                                    },
                                    {
                                        "name": "Upgrade Room",
                                        "params": ["*creep", "*room"],
                                        "args": ["*creep", "*room"],
                                        "result": -1,
                                        "id": -1,
                                        "isAction": true
                                    }
                                ]
                            },
                            {
                                "name": "➝",
                                "result": 0,
                                "id": 47,
                                "children": [
                                    {
                                        "name": "Spawn Energy Full",
                                        "params": ["?spawn", "*room"],
                                        "args": ["988056402dad25aba66e5af5", "sim"],
                                        "result": 0,
                                        "id": 47
                                    },
                                    {
                                        "name": "Build Creep",
                                        "params": ["*spawn"],
                                        "args": ["*spawn"],
                                        "result": -1,
                                        "id": -1,
                                        "isAction": true
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "?",
                        "result": 1,
                        "id": 47,
                        "children": [
                            {
                                "name": "Spawn Energy Full",
                                "params": ["?spawn", "*room"],
                                "args": ["988056402dad25aba66e5af5", "sim"],
                                "result": 0,
                                "id": 47
                            },
                            {
                                "name": "➝",
                                "result": 0,
                                "id": 47,
                                "children": [
                                    {
                                        "name": "Source Has Energy",
                                        "params": ["?source", "*room"],
                                        "args": ["7edd613592480bac57da3d7f", "sim"],
                                        "result": 1,
                                        "id": 47
                                    },
                                    {
                                        "name": "Work Creep Available",
                                        "params": ["?creep", "*room"],
                                        "args": ["76d162e718c9f1ab51413dfc", "sim"],
                                        "result": 1,
                                        "id": 47
                                    },
                                    {
                                        "name": "!",
                                        "result": 0,
                                        "id": 47,
                                        "children": [
                                            {
                                                "name": "Creep Energy Full",
                                                "params": ["*creep"],
                                                "args": ["76d162e718c9f1ab51413dfc"],
                                                "result": 1,
                                                "id": 47
                                            }
                                        ]
                                    },
                                    {
                                        "name": "Harvest Energy",
                                        "params": ["*creep", "*source"],
                                        "args": ["*creep", "*source"],
                                        "result": -1,
                                        "id": -1,
                                        "isAction": true
                                    }
                                ]
                            },
                            {
                                "name": "➝",
                                "result": 1,
                                "id": 47,
                                "children": [
                                    {
                                        "name": "Have Creep With Energy",
                                        "params": ["?creep", "*room"],
                                        "args": ["76d162e718c9f1ab51413dfc", "sim"],
                                        "result": 1,
                                        "id": 47
                                    },
                                    {
                                        "name": "Transfer Energy To Spawn",
                                        "params": ["*creep", "*spawn"],
                                        "args": ["76d162e718c9f1ab51413dfc", "988056402dad25aba66e5af5"],
                                        "result": 1,
                                        "id": 47,
                                        "isAction": true
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    ];

    const TREE_WIDTH = 400;

    window.gooey.OnMessage = function(msg) {
        // Check we can act on gooey messages.
        let elt = document.getElementById('gooey-message-area');
        elt.innerText = msg;
    };

    setupTrees(debugTrees);

    function setupTrees(trees) {
        let nav = d3.select("#tree-selection")
            .selectAll("a")
            .data(trees)
            .join(enter => {
                let entry = enter.append("a")
                    .classed("mdl-navigation__link", true);

                let label = entry.append("label")
                    .attr("for", (d, i) => `switch-${i}`)
                    .classed('mdl-switch mdl-js-switch mdl-js-ripple-effect', true);

                label.append('input')
                    .attr('type', 'checkbox')
                    .attr('id', (d, i) => `switch-${i}`)
                    .classed('mdl-switch__input', true)
                    .on('change', function(tree) {
                        if (tree.element) {
                            if (d3.event.target.checked) {
                                tree.element.style('display', 'block');
                            } else {
                                tree.element.style('display', 'none');
                            }
                        } else {
                            tree.element = createDisplay(tree);
                            d3.select("#tree-render-area")
                                .append(() => tree.element.node());
                        }
                    });

                label.append('span')
                    .classed('mdl-switch__label', true)
                    .text(d => treeName(d));

                // Force the material library to call the JS on all label
                // elements; otherwise, if loading a new tree the switches will
                // appear as checkboxes.
                componentHandler.upgradeElement(label.node());

                return entry;
            });
    }

    // TreeName returns the name of the tree with it's args or params
    // if it has any.  Arguments will be truncated if the tree has the
    // properties max_arg_length and long_arg_trunc.
    function treeName(tree) {
        let arr = tree.params;
        if (tree.args && tree.args.length > 0) {
            arr = tree.args;
        }
        if (arr && arr.length > 0) {
            let name = tree.name + ":";
            for (let a of arr) {
                name += " " + truncName(a, tree.max_arg_length, tree.long_arg_trunc);
            }
            return name;
        }
        return tree.name;
    }

    // TruncName truncates name to truncAmount if both maxLength
    // and truncAmount are defined and name is greater than or
    // equal to maxLength.
    function truncName(name, maxLength, truncAmount) {
        if (maxLength && truncAmount) {
            if (name.length >= maxLength) {
                return name.substring(0, truncAmount);
            }
        }
        return name;
    }

    // CreateDisplay creates a DOM container and an SVG rendering for
    // tree.  Drag and zoom handlers are attached to the created DOM
    // element.
    function createDisplay(tree) {
        let area = d3.select(document.createElement("div"))
            .style("position", "absolute")
            .style("width", TREE_WIDTH + "px")
            .style("top", "0px")
            .style("left", "0px")
            .attr('scaling', 1.0);

        area.append("div")
            .text(treeName(tree));

        area.append(() => render(tree).node());

        // Allow the tree to be panned around the display.
        area.call(
            d3.drag()
                .on("drag", function() {
                    let evt  = d3.event,
                        node = area.node(),
                        top  = parseInt(area.style("top")),
                        left = parseInt(area.style("left"));

                    area.attr("draggable", true)
                        .style("top", top + evt.dy + "px")
                        .style("left", left + evt.dx + "px");
                }));

        // Enlarge or shrink the tree if mouse wheel is scrolled
        // while holding the shift key.
        area.on("wheel", function() {
            let evt = d3.event;
            if (!evt.shiftKey) {
                return;
            }

            let dy   = evt.deltaY / 100,
                s    = parseFloat(area.attr('scaling')),
                next = s + dy;

            area.attr('scaling', next)
                .style('transform', `scale(${next}`);
        });

        return area;
    }

    // NodeColors returns dark and light colors in an array.  The
    // colors are determined by the value of id from node and its
    // result.
    function nodeColors(node, curr_id) {
        const CURR_ID    = curr_id,
              FAIL       = 0,
              SUCCESS    = 1,
              RUNNING    = 2,
              FAIL_DARK  = "#A80B00",
              FAIL_LIGHT = "#F7AEA9",
              SUC_DARK   = "#007300",
              SUC_LIGHT  = "#B4DFB4",
              RUN_DARK   = "#044993",
              RUN_LIGHT  = "#AEB8EC",
              NIL_DARK   = "#010101",
              NIL_LIGHT  = "#FFF";

        let dark  = NIL_DARK,
            light = NIL_LIGHT;

        if (node.id == CURR_ID) {
            switch (node.result) {
            case FAIL:
                dark  = FAIL_DARK;
                light = FAIL_LIGHT;
                break;
            case SUCCESS:
                dark  = SUC_DARK;
                light = SUC_LIGHT;
                break;
            case RUNNING:
                dark  = RUN_DARK;
                light = RUN_LIGHT;
                break;
            }
        }
        return [dark, light];
    }

    // Render creates and returns a SVG element representing a behavior tree.
    function render(tree) {
        const CURR_ID        = tree.root.id,
              NODE_SIZE      = 18,
              NIL_COLOR      = "#999",
              MAX_ARG_LENGTH = tree.max_arg_length,
              LONG_ARG_TRUNC = tree.long_arg_trunc;

        let index = 0;
        let root = d3.hierarchy(tree.root)
            .eachBefore(d => d.index = index++);

        const nodes = root.descendants();

        const svg = d3.create('svg')
              .attr("viewBox", [-NODE_SIZE / 2, -NODE_SIZE / 2, TREE_WIDTH, (nodes.length + 1) * NODE_SIZE])
              .attr("font-family", "sans-serif")
              .attr("font-size", 10)
              .style("overflow", "visible");

        // The links of the nodes need to be sorted where the target
        // node that influences the source is rendered last.  This way
        // it is painted over all the other links going from the target
        // to the source.
        //
        // For example, suppose we have the following tree:
        //
        //    ?
        //    |----(Not Hungry)        == false
        //    |----(Food Nearby)       == true
        //    |----(Restaurants Open)  == not evaluated
        //
        // Here the fallback node is true since (Food Nearby) is true,
        // so we want to render that link last so a successful colored
        // link traces back from (Food Nearby) to the '?'.  The order
        // the links going from (Not Hungry) and (Restaurants Open) don't
        // really matter as the lines drawn will be over written from
        // the link of (Not Hungry).
        let links = root.links();
        links.sort(function(a, b) {
            // Nodes of different depths aren't comparable so order by
            // lowest to highest depths.  The choice is arbitrary as
            // it doesn't really matter which are rendered first.
            if (a.source.depth < b.source.depth) {
                return -1;
            }
            if (a.source.depth > b.source.depth) {
                return 1;
            }

            let src_a = a.source.data,
                tgt_a = a.target.data;

            // If the target was never evaluated then render that first.
            if (tgt_a.id != CURR_ID) {
                return -1;
            }
            // When the source and target have the same result then we
            // know that the target influences the source result so it
            // is rendered last.
            if (src_a.result == tgt_a.result) {
                return 1;
            }
            return 0;
        });

        const link = svg.append("g")
              .attr("fill", "none")
              .attr("stroke-width", "1.5")
              .selectAll("path")
              .data(links)
              .join("path")
              .attr("stroke", function(datum) {
                  let node = datum.target.data;
                  if (node.id != CURR_ID) {
                      return NIL_COLOR;
                  }
                  let [dark, _] = nodeColors(node, CURR_ID);
                  return dark;
              })
              .attr("d", d => `
        M${d.source.depth * NODE_SIZE},${d.source.index * NODE_SIZE}
        V${d.target.index * NODE_SIZE}
        h${NODE_SIZE}
      `);

        const node = svg.append("g")
              .selectAll("g")
              .data(nodes)
              .join("g")
              .attr("transform", d => `translate(0,${d.index * NODE_SIZE})`);

        node.each(function(datum) {
            let node = datum.data;

            if (node.children) {
                let [dark, light] = nodeColors(node, CURR_ID);

                d3.select(this)
                    .append("circle")
                    .attr("cx", d => d.depth * NODE_SIZE)
                    .attr("r", 7.5)
                    .attr("stroke", dark)
                    .attr("stroke-width", "1.2")
                    .attr("fill", light);

                d3.select(this)
                    .append("text")
                    .attr("dy", "0.3em")
                    .attr("x", d => d.depth * NODE_SIZE)
                    .attr("text-anchor", "middle")
                    .attr("fill", dark)
                    .style("font-weight", "bolder")
                    .style("font-size", "0.85em")
                    .text(d => d.data.name);

                if (node.args && node.args.length > 0) {
                    let args = "";
                    for (let arg of node.args) {
                        args += arg + ' ';
                    }
                    d3.select(this)
                        .append("text")
                        .attr("dy", "0.3em")
                        .attr("x", d => d.depth * NODE_SIZE + 10)
                        .attr("fill", dark)
                        .style("font-weight", "bolder")
                        .style("font-size", "0.85em")
                        .text(args);
                }
                return;
            }

            let radius = 3.5,
                marker = undefined;

            if (node.isAction) {
                marker = d3.select(this)
                    .append("rect")
                    .attr("x", d => d.depth * NODE_SIZE - radius)
                    .attr("y", -radius)
                    .attr("width", 2*radius)
                    .attr("height", 2*radius);
            } else {
                marker = d3.select(this)
                    .append("circle")
                    .attr("cx", d => d.depth * NODE_SIZE)
                    .attr("r", radius);
            }
            marker.attr("fill", function(datum) {
                if (node.id != CURR_ID) {
                    return NIL_COLOR;
                }
                let [dark, light] = nodeColors(node, CURR_ID);
                return dark;
            });

            d3.select(this)
                .append("text")
                .attr("dy", "0.32em")
                .attr("x", d => d.depth * NODE_SIZE + 6)
                .text(d => {
                    let node = d.data,
                        name = d.data.name;

                    // Take the name of the node and the arguments if there are
                    // defined params.  The arguments will be truncated if too
                    // long.
                    //
                    // For example, suppose the name is "Is Near The End" and
                    // args is ["thing", "room"].  Then the name will be
                    // "Is Near The End: thing room.  Finally a pair of []
                    // wraps the name if the node wraps an action otherwise
                    // it will be wrapped in a pair of ().
                    if (node.params && node.params.length > 0) {
                        name += ": ";
                        if (node.id == CURR_ID) {
                            for (let arg of node.args) {
                                let a = truncName(arg, MAX_ARG_LENGTH, LONG_ARG_TRUNC);
                                name += a + ' ';
                            }
                        } else {
                            for (let p of node.params) {
                                name += p + ' ';
                            }
                        }
                        // Trim off the last ' ' from the last arg.
                        name = name.substring(0, name.length - 1);
                    }

                    if (node.isAction) {
                        name = '[' + name + ']';
                    } else {
                        name = '(' + name + ')';
                    }
                    return name;
                });
        });

        return svg;
    }

    // Reset MDL framework in case of hot-reload.
    let header = document.getElementById('main-header');
    componentHandler.upgradeElement(header);
})();
