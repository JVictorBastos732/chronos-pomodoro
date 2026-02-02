import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCicle } from '../../utils/getNextCycle';
import { getNextCicleType } from '../../utils/getNextCycleType';
import styles from './styles.module.css';

export function Cycles() {
  const { state } = useTaskContext();
  const cycleStep = Array.from({ length: state.currentCycle });
  const cycleDescriptionMap = {
    workTime: 'foco',
    shortBreakTime: 'pausa curta',
    longBreakTime: 'pausa longa'
  }

  return (
    <>
      <div className={styles.cycles}>
        <span>Ciclos:</span>

        <div className={styles.cycleDots}>
          {cycleStep.map((_, index) => {
            const nextCycle = getNextCicle(index);
            const nextCicleType = getNextCicleType(nextCycle);
            return (
              <span
              key={`${nextCicleType}_${nextCycle}`}
                className={`${styles.cycleDot} ${styles[nextCicleType]}`}
                aria-label={`Indicador de ciclo de ${cycleDescriptionMap[nextCicleType]}`}
                title={`Indicador de ciclo de ${cycleDescriptionMap[nextCicleType]}`}
              ></span>
            );
          })}
        </div>
      </div>
    </>
  );
}
