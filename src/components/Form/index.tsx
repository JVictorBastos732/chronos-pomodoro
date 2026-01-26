import styles from './styles.module.css';
import { DefaultInput } from '../DefaultInput';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { PlayCircleIcon } from 'lucide-react';

export function Form() {
    return (
        <>
            <form action="" className={styles.form}>
          <div className={styles.formRow}>
            <DefaultInput type='text' id='meuInput' labelText='Task' placeholder='Digite algo'></DefaultInput>
          </div>

          <div className={styles.formRow}>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
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