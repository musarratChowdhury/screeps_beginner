"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const role_harvester_1 = __importDefault(require("./creep_roles/role.harvester"));
const spawn = Game.spawns["Spawn1"];
const harvester1 = Game.creeps["Harvester1"];
const myHarvester1 = new role_harvester_1.default(harvester1, spawn);
myHarvester1.harvestNearestSource();
