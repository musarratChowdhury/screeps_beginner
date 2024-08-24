import MyHarvester from "./creep_roles/MyHarvester";
import MyUpgrader from "./creep_roles/MyUpgrader";
import Builder from "./creep_roles/MyBuilder";

const spawn = Game.spawns["Spawn1"];
const myHarvesters = ["Harvester2"];
const myUpgraders = ["Upgrader1"];
const myBuilder = ["Builder1"];
const myHarvesterCreeps: MyHarvester[] = [];
const myUpgraderCreeps: MyUpgrader[] = [];
const myBuilderCreeps: Creep[] = [];

myBuilder.forEach((b) => {
  if (Game.creeps[b] == undefined) {
    spawn.spawnCreep([WORK, CARRY, MOVE], b, { memory: { role: "builder" } });
  } else {
    myBuilderCreeps.push(Game.creeps[b]);
  }
});

myHarvesters.forEach((h) => {
  if (Game.creeps[h] == undefined) {
    spawn.spawnCreep([WORK, CARRY, MOVE], h);
    myHarvesterCreeps.push(new MyHarvester(Game.creeps[h], spawn));
  } else {
    myHarvesterCreeps.push(new MyHarvester(Game.creeps[h], spawn));
  }
});
//
myUpgraders.forEach((u) => {
  if (Game.creeps[u] == undefined) {
    spawn.spawnCreep([WORK, CARRY, MOVE], u);
    myUpgraderCreeps.push(new MyUpgrader(Game.creeps[u]));
  } else {
    myUpgraderCreeps.push(new MyUpgrader(Game.creeps[u]));
  }
});
//
myUpgraderCreeps.forEach((muc) => muc.run());
myHarvesterCreeps.forEach((mhc) => mhc.harvestNearestSource());
myBuilderCreeps.forEach((bC) => Builder.build(bC));
