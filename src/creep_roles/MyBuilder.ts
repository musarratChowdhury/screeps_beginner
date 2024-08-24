export default class Builder {
  static build = (builderCreep: Creep) => {
    if (builderCreep) {
      builderCreep.say("builder!");
    }

    if (builderCreep.store.getFreeCapacity() > 0) {
      Builder.fetchEnergy(builderCreep);
    } else {
      Builder.moveToCSite(builderCreep);
    }
  };

  static fetchEnergy = (builderCreep: Creep) => {
    const nearestSource =
      builderCreep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

    if (
      nearestSource &&
      builderCreep.harvest(nearestSource) === ERR_NOT_IN_RANGE
    ) {
      builderCreep.moveTo(nearestSource, { reusePath: 20 });
    } else {
      nearestSource && builderCreep.harvest(nearestSource);
    }
  };

  static moveToCSite = (builderCreep: Creep) => {
    const target = builderCreep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);

    if (target) {
      if (builderCreep.build(target) === ERR_NOT_IN_RANGE) {
        builderCreep.moveTo(target, { reusePath: 20 });
      } else {
        builderCreep.build(target);
      }
    }
  };
}
