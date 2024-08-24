/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/creep_roles/MyBuilder.ts":
/*!**************************************!*\
  !*** ./src/creep_roles/MyBuilder.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass Builder {\n}\nBuilder.build = (builderCreep) => {\n    if (builderCreep) {\n        builderCreep.say(\"builder!\");\n    }\n    if (builderCreep.store.getFreeCapacity() > 0) {\n        Builder.fetchEnergy(builderCreep);\n    }\n    else {\n        Builder.moveToCSite(builderCreep);\n    }\n};\nBuilder.fetchEnergy = (builderCreep) => {\n    const nearestSource = builderCreep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);\n    if (nearestSource &&\n        builderCreep.harvest(nearestSource) === ERR_NOT_IN_RANGE) {\n        builderCreep.moveTo(nearestSource, { reusePath: 20 });\n    }\n    else {\n        nearestSource && builderCreep.harvest(nearestSource);\n    }\n};\nBuilder.moveToCSite = (builderCreep) => {\n    const target = builderCreep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);\n    if (target) {\n        if (builderCreep.build(target) === ERR_NOT_IN_RANGE) {\n            builderCreep.moveTo(target, { reusePath: 20 });\n        }\n        else {\n            builderCreep.build(target);\n        }\n    }\n};\nexports[\"default\"] = Builder;\n\n\n//# sourceURL=webpack://default/./src/creep_roles/MyBuilder.ts?");

/***/ }),

/***/ "./src/creep_roles/MyHarvester.ts":
/*!****************************************!*\
  !*** ./src/creep_roles/MyHarvester.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst harvesterBehaviour = \"They will harvest the nearest source\";\nconst harvesterObjectives = {\n    findNearestSource: \"They will go the nearest source and harvest it\",\n};\nclass MyHarvester {\n    constructor(harvester, spawn) {\n        this._creep = harvester;\n        this._spawn = spawn;\n    }\n    getCurrentPos() {\n        return `x: ${this._creep.pos.x}, y: ${this._creep.pos.y}`;\n    }\n    moveToNearestSource() {\n        const nearestSource = this._creep.pos.findClosestByPath(FIND_SOURCES);\n        if (nearestSource) {\n            const pathToSource = this._creep.pos.findPathTo(nearestSource);\n            this._creep.moveByPath(pathToSource);\n            // Draw the path to the source\n            const visual = new RoomVisual(this._creep.room.name);\n            visual.poly(pathToSource.map((p) => [p.x, p.y]), {\n                stroke: \"yellow\",\n                lineStyle: \"dashed\",\n                strokeWidth: 0.15,\n                opacity: 0.3,\n            });\n        }\n    }\n    getBackToSpawn() {\n        const pathToSpawn = this._creep.pos.findPathTo(this._spawn);\n        this._creep.moveByPath(pathToSpawn);\n        // Draw the path to the spawn\n        const visual = new RoomVisual(this._creep.room.name);\n        visual.poly(pathToSpawn.map((p) => [p.x, p.y]), {\n            stroke: \"cyan\",\n            lineStyle: \"dashed\",\n            strokeWidth: 0.15,\n            opacity: 0.3,\n        });\n        if (this._creep.pos.isNearTo(this._spawn)) {\n            this._creep.transfer(this._spawn, RESOURCE_ENERGY);\n        }\n    }\n    harvestNearestSource() {\n        const nearestSource = this._creep.pos.findClosestByPath(FIND_SOURCES);\n        if (nearestSource && this.canCarryMore()) {\n            if (this._creep.harvest(nearestSource) === ERR_NOT_IN_RANGE) {\n                this._creep.moveTo(nearestSource, { reusePath: 20 });\n            }\n        }\n        else if (!this.canCarryMore()) {\n            this.getBackToSpawn();\n        }\n    }\n    // Method to get the current energy capacity of the creep\n    canCarryMore() {\n        return this._creep.store.getFreeCapacity() > 0;\n    }\n}\nexports[\"default\"] = MyHarvester;\n\n\n//# sourceURL=webpack://default/./src/creep_roles/MyHarvester.ts?");

/***/ }),

/***/ "./src/creep_roles/MyUpgrader.ts":
/*!***************************************!*\
  !*** ./src/creep_roles/MyUpgrader.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass MyUpgrader {\n    constructor(creep) {\n        this._creep = creep;\n    }\n    // Method to perform the upgrade action\n    upgradeController() {\n        if (this._creep.upgradeController(this._creep.room.controller) ===\n            ERR_NOT_IN_RANGE) {\n            this._creep.moveTo(this._creep.room.controller, {\n                reusePath: 20, // Number of ticks to reuse the path\n            });\n        }\n        else {\n            this._creep.transfer(this._creep.room.controller, \"energy\");\n        }\n    }\n    // Method to fetch energy when the creep's store is empty or not full\n    fetchEnergy() {\n        const nearestSource = this._creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);\n        if (nearestSource &&\n            this._creep.harvest(nearestSource) === ERR_NOT_IN_RANGE) {\n            this._creep.moveTo(nearestSource, { reusePath: 20 });\n        }\n        else {\n            nearestSource && this._creep.harvest(nearestSource);\n        }\n    }\n    // Method to check if the creep can carry more energy\n    isStoreFull() {\n        return this._creep.store.getFreeCapacity() === 0;\n    }\n    // Method to check if the creep's store is empty\n    isStoreEmpty() {\n        return this._creep.store.getUsedCapacity() === 0;\n    }\n    // Method to execute the role behavior, typically called each tick\n    run() {\n        //@ts-ignore\n        console.log(\"current job\", this._creep.memory[\"currentJob\"]);\n        //@ts-ignore\n        switch (this._creep.memory[\"currentJob\"]) {\n            case \"REFILL\":\n                if (this.isStoreFull())\n                    this._creep.memory = { currentJob: \"TRANSFER_ENERGY\" };\n                this.fetchEnergy();\n                break;\n            case \"TRANSFER_ENERGY\":\n                if (this.isStoreEmpty())\n                    this._creep.memory = { currentJob: \"REFILL\" };\n                this.upgradeController();\n                break;\n        }\n    }\n}\nexports[\"default\"] = MyUpgrader;\n\n\n//# sourceURL=webpack://default/./src/creep_roles/MyUpgrader.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst MyHarvester_1 = __importDefault(__webpack_require__(/*! ./creep_roles/MyHarvester */ \"./src/creep_roles/MyHarvester.ts\"));\nconst MyUpgrader_1 = __importDefault(__webpack_require__(/*! ./creep_roles/MyUpgrader */ \"./src/creep_roles/MyUpgrader.ts\"));\nconst MyBuilder_1 = __importDefault(__webpack_require__(/*! ./creep_roles/MyBuilder */ \"./src/creep_roles/MyBuilder.ts\"));\nconst spawn = Game.spawns[\"Spawn1\"];\nconst myHarvesters = [\"Harvester2\"];\nconst myUpgraders = [\"Upgrader1\"];\nconst myBuilder = [\"Builder1\"];\nconst myHarvesterCreeps = [];\nconst myUpgraderCreeps = [];\nconst myBuilderCreeps = [];\nmyBuilder.forEach((b) => {\n    if (Game.creeps[b] == undefined) {\n        spawn.spawnCreep([WORK, CARRY, MOVE], b, { memory: { role: \"builder\" } });\n    }\n    else {\n        myBuilderCreeps.push(Game.creeps[b]);\n    }\n});\nmyHarvesters.forEach((h) => {\n    if (Game.creeps[h] == undefined) {\n        spawn.spawnCreep([WORK, CARRY, MOVE], h);\n        myHarvesterCreeps.push(new MyHarvester_1.default(Game.creeps[h], spawn));\n    }\n    else {\n        myHarvesterCreeps.push(new MyHarvester_1.default(Game.creeps[h], spawn));\n    }\n});\n//\nmyUpgraders.forEach((u) => {\n    if (Game.creeps[u] == undefined) {\n        spawn.spawnCreep([WORK, CARRY, MOVE], u);\n        myUpgraderCreeps.push(new MyUpgrader_1.default(Game.creeps[u]));\n    }\n    else {\n        myUpgraderCreeps.push(new MyUpgrader_1.default(Game.creeps[u]));\n    }\n});\n//\nmyUpgraderCreeps.forEach((muc) => muc.run());\nmyHarvesterCreeps.forEach((mhc) => mhc.harvestNearestSource());\nmyBuilderCreeps.forEach((bC) => MyBuilder_1.default.build(bC));\n\n\n//# sourceURL=webpack://default/./src/main.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;