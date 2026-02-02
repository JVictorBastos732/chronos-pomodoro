import type { TaskStateModel } from '../../models/TaskStateModel';
import { getNextCicleType } from '../../utils/getNextCycleType';

type TipProps = {
  state: TaskStateModel;
  nextCycle: number;
};

export function Tips({ state, nextCycle }: TipProps) {
  const nextCycleType = getNextCicleType(nextCycle);
  const tipsForWhenActiveTask = {
    workTime: (
      <span>
        <b>Foque por {state.config.workTime}min.</b>
      </span>
    ),
    shortBreakTime: (
      <span>
        <b>Descançe por {state.config.shortBreakTime}min.</b>
      </span>
    ),
    longBreakTime: (
      <span>
        <b>Descançe por {state.config.longBreakTime}min.</b>
      </span>
    ),
  };

  const tipsForNoActiveTask = {
    workTime: (
      <span>
        <b>O próximo ciclo é de {state.config.workTime}min.</b>
      </span>
    ),
    shortBreakTime: (
      <span>
        <b>O próximo descanço é de {state.config.shortBreakTime}min.</b>
      </span>
    ),
    longBreakTime: (
      <span>
        <b>O próximo descanço será longo.</b>
      </span>
    ),
  };

  return (
    <>
      {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.status]}
      {!state.activeTask && tipsForNoActiveTask[nextCycleType]}
    </>
  );
}
