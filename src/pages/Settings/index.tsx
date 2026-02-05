import { SaveIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultInput } from '../../components/DefaultInput';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import { useEffect, useRef } from 'react';
import type React from 'react';
import { DefaultButton } from '../../components/DefaultButton';

import styles from './styles.module.css';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { showMessage } from '../../adapters/showMessage';
import { TaskActionsTypes } from '../../contexts/TaskContext/taskActions';

export function Settings() {
  const { state, dispatch } = useTaskContext();
  const workTimeInputRef = useRef<HTMLInputElement>(null);
  const shortBreakInputTimeRef = useRef<HTMLInputElement>(null);
  const longBreakInputTimeRef = useRef<HTMLInputElement>(null);

  function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    showMessage.dismiss();
    const formErrors = [];
    const workTime = Number(workTimeInputRef.current?.value);
    const shortBreakTime = Number(shortBreakInputTimeRef.current?.value);
    const longBreakTime = Number(longBreakInputTimeRef.current?.value);

    if (isNaN(workTime)) {
      formErrors.push('Utilize apenas números para Foco');
    }
    if (isNaN(shortBreakTime)) {
      formErrors.push('Utilize apenas números para Descanso Curto');
    }
    if (isNaN(longBreakTime)) {
      formErrors.push('Utilize apenas números para Descanso Longo');
    }
    if (workTime < 1 || workTime > 99) {
      formErrors.push('Digite valores entre 1 e 99 para Foco');
    }
    if (shortBreakTime < 1 || shortBreakTime > 30) {
      formErrors.push('Digite valores entre 1 e 30 para Descanso Curto');
    }
    if (longBreakTime < 1 || longBreakTime > 60) {
      formErrors.push('Digite valores entre 1 e 60 para descanso Longo');
    }

    if (formErrors.length > 0) {
      formErrors.forEach(error => {
        showMessage.error(error);
      });
      return;
    }

    dispatch({
      type: TaskActionsTypes.CHANGE_SETTINGS,
      payload: {
        workTime,
        shortBreakTime,
        longBreakTime,
      },
    });

    showMessage.succes('Configurações salvas');
  }

  useEffect(() => {
      document.title = 'Configurações - Chronos Pomodoro';
    });
  return (
    <>
      <MainTemplate>
        <Container>
          <Heading>Configurações</Heading>
        </Container>

        <Container>
          <p className={styles.paragraph}>
            Modifque as configurações para tempo de foco, descanso curto e
            descanso longo.
          </p>
        </Container>

        <Container>
          <form
            action='#'
            className={styles.form}
            onSubmit={handleSaveSettings}
          >
            <div className={styles.formRow}>
              <DefaultInput
                id={'workTime'}
                labelText={'Foco'}
                placeholder='Insisra o tempo'
                ref={workTimeInputRef}
                defaultValue={state.config.workTime}
                type='number'
              ></DefaultInput>
            </div>
            <div className={styles.formRow}>
              <DefaultInput
                id={'shortBreakTime'}
                labelText={'Descanso Curto'}
                placeholder='Insisra o tempo'
                ref={shortBreakInputTimeRef}
                defaultValue={state.config.shortBreakTime}
                type='number'
              ></DefaultInput>
            </div>
            <div className={styles.formRow}>
              <DefaultInput
                id={'longBreakTime'}
                labelText={'Descanso Longo'}
                placeholder='Insisra o tempo'
                ref={longBreakInputTimeRef}
                defaultValue={state.config.longBreakTime}
                type='number'
              ></DefaultInput>
            </div>
            <div className={styles.formRow}>
              {' '}
              <DefaultButton
                icon={<SaveIcon />}
                aria-label='Salvar configurações'
                title='Salvar configurações'
              ></DefaultButton>
            </div>
          </form>
        </Container>
      </MainTemplate>
    </>
  );
}
