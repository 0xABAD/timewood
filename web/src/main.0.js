(function() {
    const debugTrees = [
        {
            "type": "root",
            "name": "gather",
            "params": ["*room"],
            "args": ["sim"],
            "id": 47,
            "result": 0,
            "root": {
                "type": "parallel",
                "args": 2,
                "result": 0,
                "id": 47,
                "children": [
                    {
                        "type": "fallback",
                        "result": 0,
                        "id": 47,
                        "children": [
                            {
                                "type": "condition",
                                "name": "RoomMaxLevel",
                                "params": ["*room"],
                                "args": ["sim"],
                                "result": 0,
                                "id": 47
                            },
                            {
                                "type": "sequence",
                                "result": 0,
                                "id": 47,
                                "children": [
                                    {
                                        "type": "condition",
                                        "name": "CarryCreepAvailable",
                                        "params": ["?creep", "*room"],
                                        "args": ["76d162e718c9f1ab51413dfc", "sim"],
                                        "result": 1,
                                        "id": 47
                                    },
                                    {
                                        "type": "not",
                                        "result": 0,
                                        "id": 47,
                                        "children": [
                                            {
                                                "type": "condition",
                                                "name": "CreepEnergyFull",
                                                "params": ["*creep"],
                                                "args": ["76d162e718c9f1ab51413dfc"],
                                                "result": 1,
                                                "id": 47
                                            }
                                        ]
                                    },
                                    {
                                        "type": "condition",
                                        "name": "SpawnEnergyNearFull",
                                        "params": ["?spawn"],
                                        "args": ["?spawn"],
                                        "result": -1,
                                        "id": -1
                                    },
                                    {
                                        "type": "action",
                                        "name": "CreepCollectEnergy",
                                        "params": ["*creep", "*spawn"],
                                        "args": ["*creep", "*spawn"],
                                        "result": -1,
                                        "id": -1
                                    }
                                ]
                            },
                            {
                                "type": "sequence",
                                "result": 0,
                                "id": 47,
                                "children": [
                                    {
                                        "type": "condition",
                                        "name": "HaveCreepWithEnergy",
                                        "params": ["?creep", "*room"],
                                        "args": ["76d162e718c9f1ab51413dfc", "sim"],
                                        "result": 1,
                                        "id": 47
                                    },
                                    {
                                        "type": "condition",
                                        "name": "SpawnEnergyNearFull",
                                        "params": ["?spawn", "*room"],
                                        "args": ["988056402dad25aba66e5af5", "sim"],
                                        "result": 0,
                                        "id": 47
                                    },
                                    {
                                        "type": "action",
                                        "name": "UpgradeRoom",
                                        "params": ["*creep", "*room"],
                                        "args": ["*creep", "*room"],
                                        "result": -1,
                                        "id": -1
                                    }
                                ]
                            },
                            {
                                "type": "sequence",
                                "result": 0,
                                "id": 47,
                                "children": [
                                    {
                                        "type": "condition",
                                        "name": "SpawnEnergyFull",
                                        "params": ["?spawn", "*room"],
                                        "args": ["988056402dad25aba66e5af5", "sim"],
                                        "result": 0,
                                        "id": 47
                                    },
                                    {
                                        "type": "action",
                                        "name": "BuildCreep",
                                        "params": ["*spawn"],
                                        "args": ["*spawn"],
                                        "result": -1,
                                        "id": -1
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "fallback",
                        "result": 1,
                        "id": 47,
                        "children": [
                            {
                                "type": "condition",
                                "name": "SpawnEnergyFull",
                                "params": ["?spawn", "*room"],
                                "args": ["988056402dad25aba66e5af5", "sim"],
                                "result": 0,
                                "id": 47
                            },
                            {
                                "type": "sequence",
                                "result": 0,
                                "id": 47,
                                "children": [
                                    {
                                        "type": "condition",
                                        "name": "SourceHasEnergy",
                                        "params": ["?source", "*room"],
                                        "args": ["7edd613592480bac57da3d7f", "sim"],
                                        "result": 1,
                                        "id": 47
                                    },
                                    {
                                        "type": "condition",
                                        "name": "WorkCreepAvailable",
                                        "params": ["?creep", "*room"],
                                        "args": ["76d162e718c9f1ab51413dfc", "sim"],
                                        "result": 1,
                                        "id": 47
                                    },
                                    {
                                        "type": "not",
                                        "result": 0,
                                        "id": 47,
                                        "children": [
                                            {
                                                "type": "condition",
                                                "name": "CreepEnergyFull",
                                                "params": ["*creep"],
                                                "args": ["76d162e718c9f1ab51413dfc"],
                                                "result": 1,
                                                "id": 47
                                            }
                                        ]
                                    },
                                    {
                                        "type": "action",
                                        "name": "HarvestEnergy",
                                        "params": ["*creep", "*source"],
                                        "args": ["*creep", "*source"],
                                        "result": -1,
                                        "id": -1
                                    }
                                ]
                            },
                            {
                                "type": "sequence",
                                "result": 1,
                                "id": 47,
                                "children": [
                                    {
                                        "type": "condition",
                                        "name": "HaveCreepWithEnergy",
                                        "params": ["?creep", "*room"],
                                        "args": ["76d162e718c9f1ab51413dfc", "sim"],
                                        "result": 1,
                                        "id": 47
                                    },
                                    {
                                        "type": "action",
                                        "name": "TransferEnergyToSpawn",
                                        "params": ["*creep", "*spawn"],
                                        "args": ["76d162e718c9f1ab51413dfc", "988056402dad25aba66e5af5"],
                                        "result": 1,
                                        "id": 47
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    ];

    window.gooey.OnMessage = function(msg) {
        // Check we can act on gooey messages.
        let elt = document.getElementById('gooey-message-area');
        elt.innerText = msg;
    };

    function render(obj) {
        const width    = 954,
              nodeSize = 15;

        let index = 0;
        let root = d3.hierarchy(obj.root)
            .eachBefore(d => d.index = index++);

        const nodes = root.descendants();

        const svg = d3.select("#tree-render-area")
              .html('')
              .append('svg')
              .attr("viewBox", [-nodeSize / 2, -nodeSize * 3 / 2, width, (nodes.length + 1) * nodeSize])
              .attr("font-family", "sans-serif")
              .attr("font-size", 10)
              .style("overflow", "visible");

        const link = svg.append("g")
              .attr("fill", "none")
              .attr("stroke", "#999")
              .selectAll("path")
              .data(root.links())
              .join("path")
              .attr("d", d => `
        M${d.source.depth * nodeSize},${d.source.index * nodeSize}
        V${d.target.index * nodeSize}
        h${nodeSize}
      `);

        const node = svg.append("g")
              .selectAll("g")
              .data(nodes)
              .join("g")
              .attr("transform", d => `translate(0,${d.index * nodeSize})`);

        node.each(function(datum) {
            let node = datum.data;

            d3.select(this)
                .append("circle")
                .attr("cx", d => d.depth * nodeSize)
                .attr("r", 2.5)
                .attr("fill", d => d.children ? null : "#999");

            d3.select(this)
                .append("text")
                .attr("dy", "0.32em")
                .attr("x", d => d.depth * nodeSize + 6)
                .text(d => d.data.name);

            d3.select(this)
                .append("title")
                .text(d => d
                      .ancestors()
                      .reverse()
                      .map(d => d.data.name)
                      .join("/"));
        });
    }

    render(debugTrees[0]);

    // Reset MDL framework in case of hot-reload.
    let header = document.getElementById('main-header');
    componentHandler.upgradeElement(header);
})();
