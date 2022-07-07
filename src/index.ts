import { BasePrisoner, Box, Experiment, Room } from "./game"


class PrisonerWithOutPlan extends BasePrisoner {
  private traversed: Set<number> = new Set<number>()

  setup() {
    this.traversed = new Set<number>()
  }

  getNextBoxIndex(_room: Room, prevBox: Box | null) {
    let to = Math.floor(Math.random() * _room.count)
    while(this.traversed.has(to)) {
      to = Math.floor(Math.random() * _room.count)
    }
    this.traversed.add(to)
    return to
  }
}

// Randomized method
const runner = new Experiment(100, PrisonerWithOutPlan)
const result = runner.run(1000)

console.log(result)