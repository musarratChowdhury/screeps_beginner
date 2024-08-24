export default class MyUpgrader {
  private _creep: Creep;

  constructor(creep: Creep) {
    this._creep = creep;
  }

  // Method to perform the upgrade action
  upgradeController() {
    if (
      this._creep.upgradeController(this._creep.room.controller!) ===
      ERR_NOT_IN_RANGE
    ) {
      this._creep.moveTo(this._creep.room.controller!, {
        reusePath: 20, // Number of ticks to reuse the path
      });
    } else {
      this._creep.transfer(this._creep.room.controller!, "energy");
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
      this._creep.moveTo(nearestSource, { reusePath: 20 });
    } else {
      nearestSource && this._creep.harvest(nearestSource);
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
    //@ts-ignore
    console.log("current job", this._creep.memory["currentJob"]);
    //@ts-ignore
    switch (this._creep.memory["currentJob"]) {
      case "REFILL":
        if (this.isStoreFull())
          this._creep.memory = { currentJob: "TRANSFER_ENERGY" };
        this.fetchEnergy();
        break;
      case "TRANSFER_ENERGY":
        if (this.isStoreEmpty()) this._creep.memory = { currentJob: "REFILL" };
        this.upgradeController();
        break;
    }
  }
}
