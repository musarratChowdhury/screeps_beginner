import MyHarvester from "./creep_roles/role.harvester";

const spawn = Game.spawns["Spawn1"];
const harvester1 = Game.creeps["Harvester1"];

const myHarvester1 = new MyHarvester(harvester1, spawn);
myHarvester1.harvestNearestSource();
