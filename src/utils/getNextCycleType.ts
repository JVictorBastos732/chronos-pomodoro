import type { TaskModel } from "../models/TaskModel";

export function getNextCicleType(currentCicle: number): TaskModel['status'] {
    if (currentCicle % 8 === 0) return 'longBreakTime';
    if (currentCicle % 2 === 0) return 'shortBreakTime';
    return 'workTime'
}