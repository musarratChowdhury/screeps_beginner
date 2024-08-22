export default class MyUpgrader {
  private _creep: Creep;
  private _currentJob = "REFILL";

  constructor(creep: Creep) {
    this._creep = creep;
    this._creep.memory = { role: "upgrader" };
  }

  // Method to perform the upgrade action
  upgradeController() {
    if (this._creep.store[RESOURCE_ENERGY] > 0) {
      if (
        this._creep.upgradeController(this._creep.room.controller!) ===
        ERR_NOT_IN_RANGE
      ) {
        this._creep.moveTo(this._creep.room.controller!);
      }
    }
  }

  // Method to fetch energy when the creep's store is empty or not full
  fetchEnergy() {
    const nearestSource =
      this._creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

    if (
      nearestSource &&
      this._creep.harvest(nearestSource) === ERR_NOT_IN_RANGE
    ) {
      this._creep.moveTo(nearestSource);
    } else {
      // Alternatively, fetch energy from containers or storage
      const container = this._creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) =>
          structure.structureType === STRUCTURE_CONTAINER &&
          structure.store[RESOURCE_ENERGY] > 0,
      });

      if (
        container &&
        this._creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE
      ) {
        this._creep.moveTo(container);
      }
    }
  }

  // Method to check if the creep can carry more energy
  isStoreFull(): boolean {
    return this._creep.store.getFreeCapacity() === 0;
  }

  // Method to check if the creep's store is empty
  isStoreEmpty(): boolean {
    return this._creep.store.getUsedCapacity() === 0;
  }

  // Method to execute the role behavior, typically called each tick
  run() {
    switch (this._currentJob) {
      case "REFILL":
        if (this.isStoreFull()) this._currentJob = "TRANSFER_ENERGY";
        this.fetchEnergy();
        break;
      case "TRANSFER_ENERGY":
        if (this.isStoreEmpty()) this._currentJob = "REFILL";
        this.upgradeController();
        break;
    }
  }
}
