import type { TaskStateModel } from "./TaskStateModel";

export type TaskModel = {
  id: number;
  name: string;
  duration: number;
  startDate: number;
  completeDate: number | null;
  interruptDate: number | null;
  status: keyof TaskStateModel['config'];
};
