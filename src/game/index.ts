import { shuffle } from 'lodash'

export interface Box {
  /**
   * Value written on top of the Box
   */
  boxIndex: number

  /**
   * Value written inside the Box
   */
  valIndex: number
}

/**
 * For simplicity using 0 base instead of 1 base number.
 */
export class Room {
  private boxes: number[] = []

  /**
   * @param count number of boxes
   */
  constructor(public readonly count: number) {
    for (let i = 0; i < count; i++) {
      this.boxes[i] = i
    }
    this.boxes = shuffle(this.boxes)
  }

  /**
   * @param boxIndex starts with 0~(count-1)
   */
  public open(boxIndex: number): Box {
    if (boxIndex >= this.count) {
      throw new Error(`Invalid boxIndex: ${boxIndex}`)
    }
    return {
      boxIndex,
      valIndex: this.boxes[boxIndex]
    }
  }
}

export abstract class BasePrisoner {

  /**
   * Create prisoner with the specific index.
   */
  constructor(public readonly myIndex: number, public readonly verbose: boolean = false) {
  }

  /**
   * 
   */
  findMyNumber(room: Room): number | null {
    let current: Box | null = null
    const threshold = Math.ceil(room.count / 2)
    let openCount = 0
    this.setup(room)
    while (openCount < threshold) {
      const toOpen = this.getNextBoxIndex(room, current || null)
      current = room.open(toOpen)
      // console.log(`P${this.myIndex} open ${toOpen} got ${current.valIndex}`)
      openCount++
      if (current && current.valIndex === this.myIndex) {
        if (this.verbose) {
          console.info(`P${this.myIndex} escaped!`)
        }
        return openCount
      }
    }
    if (this.verbose) {
      console.info(`P${this.myIndex} exceeds open count: ${openCount}`)
    }
    return null
  }

  /**
   * Called everytime the prisoner is about to enter the room. A chance for you to setup your 
   * strategy
   * 
   * @param room 
   */
  abstract setup(room: Room): void

  /**
   * Called when prisoner entered the room, and need to find next box to open.
   * 
   * @param room 
   * @param prevBox 
   */
  abstract getNextBoxIndex(room: Room, prevBox: Box | null): number
}

export class Experiment<T extends BasePrisoner> {

  constructor(
    public readonly prisonerCount: number,
    public readonly prisonerCnstr: new (index: number, verbose: boolean) => T, 
    public readonly verbose: boolean = false) {
  }

  /**
   * Run experiments for runCount times, and emit the results count as successCount and failedCount
   * 
   * @param runCount
   * @returns 
   */
  run(runCount: number): { success: number, failed: number } {
    const res = {
      success: 0,
      failed: 0,
    }
    for (let i = 0; i < runCount; i++) {
      const room = new Room(this.prisonerCount)
      const key = this.once(room)
      res[key]++
    }
    return res
  }

  /**
   * Internal method that wrap around how the room is being run against the crowd of prisoners
   * 
   * @param room
   * @returns 
   */
  protected once(room: Room): 'success' | 'failed' {
    // run
    for (let i = 0; i < this.prisonerCount; i++) {
      const p = new this.prisonerCnstr(i, this.verbose)
      const successAtIndex = p.findMyNumber(room)
      if (typeof successAtIndex !== 'number') {
        return 'failed'
      }
    }
    return 'success'
  }
}