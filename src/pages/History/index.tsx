import { TrashIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { formatDate } from '../../utils/formatDate';
import { getTasktatus } from '../../utils/getTaskStatus';
import { sortTasks, type SortTasksOptions } from '../../utils/sortTasks';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';
import { TaskActionsTypes } from '../../contexts/TaskContext/taskActions';
import { toast } from 'react-toastify';
import { showMessage } from '../../adapters/showMessage';

export function History() {
  const { state, dispatch } = useTaskContext();
  const [confirmClearHistory, setConfirmClearHistory] = useState(false);
  const hasTasks = state.tasks.length > 0;

  const [sortTasksOptions, setSortTasksOptions] = useState<SortTasksOptions>(
    () => {
      return {
        tasks: sortTasks({ tasks: state.tasks }),
        field: 'startDate',
        direction: 'desc',
      };
    },
  );

  useEffect(() => {
    document.title = 'Histórico - Chronos Pomodoro';
  });

  useEffect(() => {
    if (!confirmClearHistory) return;

    setConfirmClearHistory(false);

    dispatch({ type: TaskActionsTypes.RESET_STATE });
  }, [confirmClearHistory, dispatch]);


  useEffect(() => {
    setSortTasksOptions(prevState => ({
      ...prevState,
      tasks: sortTasks({
        tasks: state.tasks,
        direction: prevState.direction,
        field: prevState.field,
      }),
    }));
  }, [state.tasks]);

  useEffect(() => {
    return () => {
      showMessage.dismiss();
    }
  }, []);

  function handleSortTasks({ field }: Pick<SortTasksOptions, 'field'>) {
    const newDirection = sortTasksOptions.direction === 'asc' ? 'desc' : 'asc';

    setSortTasksOptions({
      tasks: sortTasks({
        direction: newDirection,
        tasks: sortTasksOptions.tasks,
        field,
      }),
      direction: newDirection,
      field,
    });
  }

  function handleResetHistory() {
    showMessage.dismiss();
    showMessage.confirm('Tem certeza?', confirmation => {
      setConfirmClearHistory(confirmation);
    });
  }

  return (
    <>
      <MainTemplate>
        <Container>
          <Heading>
            <span>Histórico</span>
            {hasTasks && (
              <span className={styles.buttonContainer}>
                <DefaultButton
                  icon={<TrashIcon />}
                  color='red'
                  aria-label='Apagar todo o histórico'
                  title='Apagar histórico'
                  onClick={handleResetHistory}
                ></DefaultButton>
              </span>
            )}
          </Heading>
        </Container>

        <Container>
          {hasTasks && (
            <div className={styles.responsiveTable}>
              <table>
                <thead>
                  <tr>
                    <th
                      className={styles.thSort}
                      onClick={() => handleSortTasks({ field: 'name' })}
                    >
                      Tarefa ⭥
                    </th>
                    <th
                      className={styles.thSort}
                      onClick={() => handleSortTasks({ field: 'duration' })}
                    >
                      Duração ⭥
                    </th>
                    <th
                      className={styles.thSort}
                      onClick={() => handleSortTasks({ field: 'startDate' })}
                    >
                      Data ⭥
                    </th>
                    <th>Status</th>
                    <th>Tipo</th>
                  </tr>
                </thead>

                <tbody>
                  {sortTasksOptions.tasks.map(task => {
                    const taskTypeDictionary = {
                      workTime: 'Em foco',
                      shortBreakTime: 'Descanso curto',
                      longBreakTime: 'Descanso longo',
                    };
                    return (
                      <tr key={task.id}>
                        <td>{task.name}</td>
                        <td>{task.duration}min</td>
                        <td>{formatDate(task.startDate)}</td>
                        <td>{getTasktatus(task, state.activeTask)}</td>
                        <td>{taskTypeDictionary[task.type]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {!hasTasks && (
            <p className={styles.paragarph}>
              Ainda não existem tarefas criadas!
            </p>
          )}
        </Container>
      </MainTemplate>
    </>
  );
}
