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
        const width = 954;

        let tree = d3.hierarchy(obj.root);
        tree.dx = 10;
        tree.dy = width / (tree.height + 1);

        let root = d3.tree().nodeSize([tree.dx, tree.dy])(tree);

        let x0 = Infinity;
        let x1 = -x0;

        root.each(d => {
            if (d.x > x1) x1 = d.x;
            if (d.x < x0) x0 = d.x;
        });

        const svg = d3.select("#tree-render-area")
              .html('')
              .append('svg')
              .attr("viewBox", [0, 0, width, x1 - x0 + tree.dx * 2]);

        const g = svg.append("g")
              .attr("font-family", "sans-serif")
              .attr("font-size", 10)
              .attr("transform", `translate(${tree.dy / 3},${tree.dx - x0})`);

        const link = g.append("g")
              .attr("fill", "none")
              .attr("stroke", "#555")
              .attr("stroke-opacity", 0.4)
              .attr("stroke-width", 1.5)
              .selectAll("path")
              .data(root.links())
              .join("path")
              .attr("d", d3.linkHorizontal()
                    .x(d => d.y)
                    .y(d => d.x));

        const node = g.append("g")
              .attr("stroke-linejoin", "round")
              .attr("stroke-width", 3)
              .selectAll("g")
              .data(root.descendants())
              .join("g")
              .attr("transform", d => `translate(${d.y},${d.x})`);

        node.append("circle")
            .attr("fill", d => d.children ? "#555" : "#999")
            .attr("r", 2.5);

        node.append("text")
            .attr("dy", "0.31em")
            .attr("x", d => d.children ? -6 : 6)
            .attr("text-anchor", d => d.children ? "end" : "start")
            .text(d => d.data.name)
            .clone(true).lower()
            .attr("stroke", "white");
    }

    render(debugTrees[0]);

    // Reset MDL framework in case of hot-reload.
    let header = document.getElementById('main-header');
    componentHandler.upgradeElement(header);
})();
