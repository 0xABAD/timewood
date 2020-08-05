(function() {
    const debugTree = {
        "type": "root",
        "params": ["*room"],
        "args": ["sim"],
        "id": 47,
        "result": 0,
        "root": {
            "type": "parallel",
            "args": 2,
            "result": 0,
            "id": 47,
            "kids": [
                {
                    "type": "fallback",
                    "result": 0,
                    "id": 47,
                    "kids": [
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
                            "kids": [
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
                                    "kids": [
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
                            "kids": [
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
                            "kids": [
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
                    "kids": [
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
                            "kids": [
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
                                    "kids": [
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
                            "kids": [
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
    };

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
