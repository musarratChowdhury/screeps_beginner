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

/***/ "./src/creep_roles/role.harvester.ts":
/*!*******************************************!*\
  !*** ./src/creep_roles/role.harvester.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst harvesterBehaviour = \"They will harvest the nearest source\";\nconst harvesterObjectives = {\n    findNearestSource: \"They will go the nearest source and harvest it\",\n};\nclass MyHarvester {\n    constructor(harvester, spawn) {\n        this._creep = harvester;\n        this._spawn = spawn;\n    }\n    getCurrentPos() {\n        return `x: ${this._creep.pos.x}, y: ${this._creep.pos.y}`;\n    }\n    moveToNearestSource() {\n        const nearestSource = this._creep.pos.findClosestByPath(FIND_SOURCES);\n        if (nearestSource) {\n            const pathToSource = this._creep.pos.findPathTo(nearestSource);\n            this._creep.moveByPath(pathToSource);\n            // Draw the path to the source\n            const visual = new RoomVisual(this._creep.room.name);\n            visual.poly(pathToSource.map((p) => [p.x, p.y]), {\n                stroke: \"yellow\",\n                lineStyle: \"dashed\",\n                strokeWidth: 0.15,\n                opacity: 0.3,\n            });\n        }\n    }\n    getBackToSpawn() {\n        const pathToSpawn = this._creep.pos.findPathTo(this._spawn);\n        this._creep.moveByPath(pathToSpawn);\n        // Draw the path to the spawn\n        const visual = new RoomVisual(this._creep.room.name);\n        visual.poly(pathToSpawn.map((p) => [p.x, p.y]), {\n            stroke: \"cyan\",\n            lineStyle: \"dashed\",\n            strokeWidth: 0.15,\n            opacity: 0.3,\n        });\n        if (this._creep.pos.isNearTo(this._spawn)) {\n            this._creep.transfer(this._spawn, RESOURCE_ENERGY);\n        }\n    }\n    harvestNearestSource() {\n        const nearestSource = this._creep.pos.findClosestByPath(FIND_SOURCES);\n        if (nearestSource && this.canCarryMore()) {\n            if (this._creep.harvest(nearestSource) === ERR_NOT_IN_RANGE) {\n                this._creep.moveTo(nearestSource);\n            }\n        }\n        else if (!this.canCarryMore()) {\n            this.getBackToSpawn();\n        }\n    }\n    // Method to get the current energy capacity of the creep\n    canCarryMore() {\n        return this._creep.store.getFreeCapacity() > 0;\n    }\n}\nexports[\"default\"] = MyHarvester;\n\n\n//# sourceURL=webpack://default/./src/creep_roles/role.harvester.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst role_harvester_1 = __importDefault(__webpack_require__(/*! ./creep_roles/role.harvester */ \"./src/creep_roles/role.harvester.ts\"));\nconst spawn = Game.spawns[\"Spawn1\"];\nconst harvester1 = Game.creeps[\"Harvester1\"];\nconst myHarvester1 = new role_harvester_1.default(harvester1, spawn);\nmyHarvester1.harvestNearestSource();\n\n\n//# sourceURL=webpack://default/./src/main.ts?");

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