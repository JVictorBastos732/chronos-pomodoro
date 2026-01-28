import styles from './styles.module.css';
import { DefaultInput } from '../DefaultInput';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { PlayCircleIcon } from 'lucide-react';

type FormProps = {
    workTime: number;
}

export function Form() {
    return (
        <>
            <form action="" className={styles.form}>
          <div className={styles.formRow}>
            <DefaultInput type='text' id='meuInput' labelText='Task' placeholder='Digite algo'></DefaultInput>
          </div>

          <div className={styles.formRow}>
            <p>O próximo intervalo é de 25min</p>
          </div>

          <div className={styles.formRow}>
            <Cycles></Cycles>
          </div>

          <div className={styles.formRow}>
            <DefaultButton icon={ <PlayCircleIcon/> } color='green'/>
          </div>
        </form>
        </>
    );
}