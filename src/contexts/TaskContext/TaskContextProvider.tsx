import { useEffect, useReducer, useRef } from 'react';
import { initialTaskState } from './initialTaskState';
import { TaskContext } from './TaskContext';
import { taskReducer } from './taskReducer';
import { TimeWorkerManager } from '../../workers/TimeWorkerManager';
import { TaskActionsTypes } from './taskActions';
import { loadBeep } from '../../utils/loadBeep';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  const worker = TimeWorkerManager.getInstance();

  const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);

  worker.onmessage(e => {
    const countDownSeconds = e.data;

    if (countDownSeconds <= 0) {
      dispatch({ type: TaskActionsTypes.COMPLETE_TASK });
      if (playBeepRef.current) {
        playBeepRef.current();
        playBeepRef.current = null;
      }
    } else {
      dispatch({
        type: TaskActionsTypes.COUNT_DOWN,
        payload: { secondsRemaining: countDownSeconds },
      });
    }
  });

  useEffect(() => {
    if (!state.activeTask) {
      worker.termiante();
    }

    worker.postMessage(state);
  }, [worker, state]);

  useEffect(() => {
    if (state.activeTask && playBeepRef.current === null) {
      playBeepRef.current = loadBeep();
    } else {
      playBeepRef.current = null;
    }
  }, [state.activeTask]);
  return (
    <>
      <TaskContext.Provider value={{ state, dispatch }}>
        {children}
      </TaskContext.Provider>
    </>
  );
}
