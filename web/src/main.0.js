(function() {
    const TREE_WIDTH           = 400,
          MAX_RING_BUFFER_SIZE = 120;

    let RingBuffer      = [],
        RingBufferIndex = -1,
        PausedBuffer    = [],
        PausedIndex     = -1,
        IsPaused        = false,
        TreeTick        = 0;

    d3.select("#button_previous")
        .on("click", function() {
            if (!IsPaused) {
                pause();
                togglePlayPause();
            }
            if (PausedIndex > 0) {
                let prev = PausedBuffer[PausedIndex];
                PausedIndex--;
                copyView(prev.trees, PausedBuffer[PausedIndex].trees);
                setupView(PausedBuffer[PausedIndex]);
                setHistory(PausedBuffer, PausedIndex);
            }
        });

    d3.select("#button_next")
        .on("click", function() {
            if (!IsPaused) {
                pause();
                togglePlayPause();
            }
            if (PausedIndex < PausedBuffer.length - 1) {
                let prev = PausedBuffer[PausedIndex];
                PausedIndex++;
                copyView(prev.trees, PausedBuffer[PausedIndex].trees);
                setupView(PausedBuffer[PausedIndex]);
                setHistory(PausedBuffer, PausedIndex);
            }
        });

    d3.select("#button_play")
        .on("click", function() {
            let prev = undefined;
            if (PausedIndex > -1) {
                prev = PausedBuffer[PausedIndex];
            }
            IsPaused    = false;
            PausedIndex = -1;

            togglePlayPause();
            clearHistory();
            if (RingBufferIndex > -1) {
                let curr = RingBuffer[RingBufferIndex];
                if (prev) {
                    copyView(prev.trees, curr.trees);
                }
                setupView(curr);
            }
        });

    d3.select("#button_pause")
        .on("click", function() {
            pause();
            togglePlayPause();
            setHistory(PausedBuffer, PausedIndex);
        });

    d3.select("#button_meta")
        .on("click", function() {
            let area    = d3.select("#meta-data-area"),
                display = area.style("display");

            if (display == "none") {
                area.style("display", "block");
            } else {
                area.style("display", "none");
            }
        });

    // Pause setups the paused tree buffer by copying over the current
    // active tree buffer.
    function pause() {
        IsPaused     = true;
        PausedBuffer = [];
        PausedIndex  = RingBuffer.length - 1;

        if (PausedIndex == -1) {
            return;
        }

        // Add all the trees from the ring buffer to the paused buffer
        // starting from the next tree set that will be evicted from
        // the ring buffer.  This places the most recent tree placed
        // in the ring buffer at the end of the paused buffer.
        for (let i = 0; i < RingBuffer.length; i++) {
            let idx = i;
            // When the ring buffer is not filled up we only want to
            // copy from the front of the ring buffer to its last element.
            // If we were to set idx in this `if` statement if the ring
            // buffer was not filled then we could end up pusing an
            // element that doesn't exist yet.
            if (RingBuffer.length == MAX_RING_BUFFER_SIZE) {
                idx = (i + RingBufferIndex + 1) % MAX_RING_BUFFER_SIZE;
            }
            PausedBuffer.push(RingBuffer[idx]);
        }
    }

    // AppendTrees adds trees to RingBuffer and updates the page's
    // tree tick.
    function appendTrees(trees) {
        if (RingBuffer.length < MAX_RING_BUFFER_SIZE) {
            RingBuffer.push(trees);
            RingBufferIndex++;
        } else {
            RingBufferIndex = (RingBufferIndex + 1) % MAX_RING_BUFFER_SIZE;
            RingBuffer[RingBufferIndex] = trees;
        }

        TreeTick++;
        d3.select("#tree_tick_update")
            .text(`Tree Tick: ${TreeTick}`);
    }

    function clearHistory() {
        d3.select("#history_index").text("");
    }

    function setHistory(buffer, index) {
        d3.select("#history_index")
            .text(`Tree History: ${index + 1} of ${buffer.length}`);
    }

    // CopyView copies over the user interaction visual changes
    // (e.g. panning and zooming) and whether certain trees are
    // visible from fromTrees over toTrees.  For a tree to be
    // copied over it must that same name, parameters, and arguments
    // for the tree.  This equality doesn't apply to any of the
    // trees nodes or other properties.
    function copyView(fromTrees, toTrees) {

        // Helper function to compute the unique identifier of a tree.
        function treeId(tree) {
            let id = tree.name;
            if (Array.isArray(tree.params)) {
                for (let p of tree.params) {
                    id += `:${p}`;
                }
            }
            if (Array.isArray(tree.args)) {
                for (let a of tree.args) {
                    id += `:${a}`;
                }
            }
            return id;
        }

        let toTable = {};
        for (let to of toTrees) {
            toTable[treeId(to)] = to;
        }

        for (let from of fromTrees) {
            if (!from.element) {
                continue;
            }

            let id = treeId(from),
                to = toTable[id];

            if (!to) {
                continue;
            }
            if (!to.element) {
                to.element = createDisplay(to);
            }

            let scaling = from.element.attr("scaling");
            to.element
                .style("display", from.element.style("display"))
                .style("top", from.element.style("top"))
                .style("left", from.element.style("left"))
                .attr("scaling", scaling)
                .style("transform", `scale(${scaling})`);

            // Remove the from tree from the rendering area while
            // adding the new one.
            from.element.remove();
            d3.select("#tree-render-area")
                .append(() => to.element.node());
        }
    }

    // TogglePlayPause hides or shows the play/pause buttons depending
    // if the view is paused or not.
    function togglePlayPause() {
        if (IsPaused) {
            d3.select("#button_pause")
                .style("display", "none");
            d3.select("#button_play")
                .style("display", "inline-block");
        } else {
            d3.select("#button_play")
                .style("display", "none");
            d3.select("#button_pause")
                .style("display", "inline-block");
        }
    }

    // SetupView resets the tree toggle panel to allow the given trees
    // within be togglable for visualization.
    function setupView(content) {
        let meta = d3.select("#meta-data-area")
            .html('')
            .call(d3.drag()
                  .on("drag", function() {
                    let evt  = d3.event,
                        node = meta.node(),
                        top  = parseInt(meta.style("top")),
                        left = parseInt(meta.style("left"));

                    meta.attr("draggable", true)
                        .style("top", top + evt.dy + "px")
                        .style("left", left + evt.dx + "px");
                  }));

        for (let item in content.meta) {
            let div = meta.append("div")
                .classed("meta-element", true);

            div.append("span").text(item);

            div.append("span")
                .style("margin-left", "10px")
                .text(content.meta[item]);
        }

        let nav = d3.select("#tree-selection")
            .html('')
            .selectAll("a")
            .data(content.trees)
            .join(enter => {
                let entry = enter.append("a")
                    .classed("mdl-navigation__link", true);

                let label = entry.append("label")
                    .attr("for", (d, i) => `switch-${i}`)
                    .classed("mdl-switch mdl-js-switch mdl-js-ripple-effect", true);

                label.append("input")
                    .attr("type", "checkbox")
                    .attr("id", (d, i) => `switch-${i}`)
                    .classed("mdl-switch__input", true)
                    .on("change", function(tree) {
                        if (tree.element) {
                            if (d3.event.target.checked) {
                                tree.element.style("display", "block");
                            } else {
                                tree.element.style("display", "none");
                            }
                        } else {
                            tree.element = createDisplay(tree);
                            tree.element.style("display", "block");

                            d3.select("#tree-render-area")
                                .append(() => tree.element.node());
                        }
                    });

                label.append("span")
                    .classed("mdl-switch__label", true)
                    .text(d => treeName(d));

                // Force the material library to call the JS on all label
                // elements; otherwise, if loading a new tree the switches will
                // appear as checkboxes.
                label.each(function() {
                    componentHandler.upgradeElement(d3.select(this).node());
                });

                // After upgrading components we set the is-checked class in
                // case the tree element was rendered in one set of trees while
                // also belonging to another set of trees and the user switched
                // to that new set.  This can be done by clicking on either of
                // the prev or next buttons to view other trees in history.  Since
                // there is a new set of trees we can assume the tree navigation
                // will be wiped; however, the new set may have been one that was
                // viewed previously and since it is now viewed again we would
                // like to restore its previous state.
                label.classed("is-checked", tree => {
                    if (tree.element) {
                        let s = tree.element.style("display");
                        if (s == "block") {
                            return true;
                        }
                    }
                    return false;
                });


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

    window.gooey.OnMessage = function(msg) {
        // Process message
        let trees = JSON.parse(msg),
            prev  = undefined;

        if (RingBufferIndex != -1) {
            prev = RingBuffer[RingBufferIndex];
        }

        appendTrees(trees);
        if (IsPaused) {
            return;
        }

        let curr = RingBuffer[RingBufferIndex];
        if (prev) {
            copyView(prev.trees, curr.trees);
        }
        setupView(curr);
    };

    // Reset MDL framework in case of hot-reload.
    let header = document.getElementById('main-header');
    componentHandler.upgradeElement(header);
})();
