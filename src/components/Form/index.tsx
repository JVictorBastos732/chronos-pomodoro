import styles from './styles.module.css';
import { DefaultInput } from '../DefaultInput';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { useRef } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCicle } from '../../utils/getNextCycle';
import { getNextCicleType } from '../../utils/getNextCycleType';
import { TaskActionsTypes } from '../../contexts/TaskContext/taskActions';
import { Tips } from '../Tips';

export function Form() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  const nextCycle = getNextCicle(state.currentCycle);
  const nextCycleType = getNextCicleType(nextCycle);

  function handleCreateNewTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      alert('Insira o nome da task');
      return;
    }

    const newTask: TaskModel = {
      id: Date.now(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      status: nextCycleType,
    };

    dispatch({ type: TaskActionsTypes.START_TASK, payload: newTask });
  }

  function handleInterruptTask() {
    dispatch({ type: TaskActionsTypes.INTERRUPT_TASK });
  }

  return (
    <>
      <form onSubmit={handleCreateNewTask} action='' className={styles.form}>
        <div className={styles.formRow}>
          <DefaultInput
            type='text'
            id='meuInput'
            labelText='Task'
            placeholder='Digite algo'
            ref={taskNameInput}
            disabled={!!state.activeTask}
            onClick={handleInterruptTask}
            key='button_submit'
          ></DefaultInput>
        </div>

        <div className={styles.formRow}>
          <Tips state={state} nextCycle={nextCycle} />
        </div>

        {state.currentCycle > 0 && (
          <div className={styles.formRow}>
            <Cycles></Cycles>
          </div>
        )}

        <div className={styles.formRow}>
          {!state.activeTask && (
            <DefaultButton
              aria-label='Iniciar nova tarefa'
              title='Iniciar nova tarefa'
              icon={<PlayCircleIcon />}
              color='green'
              type='submit'
              key='botao_submit'
            />
          )}

          {!!state.activeTask && (
            <DefaultButton
              aria-label='Parar tarefa atual'
              title='Parar tarefa atual'
              icon={<StopCircleIcon />}
              color='red'
              type='button'
              key='botao_button'
              onClick={handleInterruptTask}
            />
          )}
        </div>
      </form>
    </>
  );
}
