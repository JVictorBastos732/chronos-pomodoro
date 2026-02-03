import styles from './styles.module.css';
import { RouterLink } from '../Routerlink';

export function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <RouterLink href='/about-pomodoro'>
          Entenda como funciona a técnica pomodoro.
        </RouterLink>
        <RouterLink href='/'>
          Chronos Pomodoro &copy; {new Date().getFullYear()} - Desenvolvido por
          João Victor Bastos
        </RouterLink>
      </footer>
    </>
  );
}
