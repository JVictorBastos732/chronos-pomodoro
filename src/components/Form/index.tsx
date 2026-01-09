import styles from './styles.module.css';
import { CircleIcon, PlayIcon } from 'lucide-react';
import { DefaultInput } from '../DefaultInput';

export function Form() {
    return (
        <>
            <form action="" className={styles.form}>
          <div className={styles.formRow}>
            <DefaultInput type='text' id='meuInput' labelText='Task' placeholder='Digite algo' defaultValue='Preenchendo valor'></DefaultInput>
          </div>

          <div className={styles.formRow}>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>

          <div className={styles.formRow}>
            <p>Ciclos</p>
            <div>
              <CircleIcon></CircleIcon>
              <CircleIcon></CircleIcon>
              <CircleIcon></CircleIcon>
              <CircleIcon></CircleIcon>
              <CircleIcon></CircleIcon>
            </div>
          </div>

          <div className={styles.formRow}>
            <button>
              <PlayIcon></PlayIcon>
            </button>
          </div>
        </form>
        </>
    );
}