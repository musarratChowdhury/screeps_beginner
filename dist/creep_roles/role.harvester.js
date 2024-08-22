"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const harvesterBehaviour = "They will harvest the nearest source";
const harvesterObjectives = {
    findNearestSource: "They will go the nearest source and harvest it",
};
class MyHarvester {
    constructor(harvester, spawn) {
        this._creep = harvester;
        this._spawn = spawn;
    }
    getCurrentPos() {
        return `x: ${this._creep.pos.x}, y: ${this._creep.pos.y}`;
    }
    moveToNearestSource() {
        const nearestSource = this._creep.pos.findClosestByPath(FIND_SOURCES);
        if (nearestSource) {
            const pathToSource = this._creep.pos.findPathTo(nearestSource);
            this._creep.moveByPath(pathToSource);
            // Draw the path to the source
            const visual = new RoomVisual(this._creep.room.name);
            visual.poly(pathToSource.map((p) => [p.x, p.y]), {
                stroke: "yellow",
                lineStyle: "dashed",
                strokeWidth: 0.15,
                opacity: 0.3,
            });
        }
    }
    getBackToSpawn() {
        const pathToSpawn = this._creep.pos.findPathTo(this._spawn);
        this._creep.moveByPath(pathToSpawn);
        // Draw the path to the spawn
        const visual = new RoomVisual(this._creep.room.name);
        visual.poly(pathToSpawn.map((p) => [p.x, p.y]), {
            stroke: "cyan",
            lineStyle: "dashed",
            strokeWidth: 0.15,
            opacity: 0.3,
        });
        if (this._creep.pos.isNearTo(this._spawn)) {
            this._creep.transfer(this._spawn, RESOURCE_ENERGY);
        }
    }
    harvestNearestSource() {
        const nearestSource = this._creep.pos.findClosestByPath(FIND_SOURCES);
        if (nearestSource && this.canCarryMore()) {
            if (this._creep.harvest(nearestSource) === ERR_NOT_IN_RANGE) {
                this._creep.moveTo(nearestSource);
            }
        }
        else if (!this.canCarryMore()) {
            this.getBackToSpawn();
        }
    }
    // Method to get the current energy capacity of the creep
    canCarryMore() {
        return this._creep.store.getFreeCapacity() > 0;
    }
}
exports.default = MyHarvester;
