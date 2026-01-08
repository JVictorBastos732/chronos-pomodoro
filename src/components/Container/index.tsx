import styles from './styles.module.css';

type ConatinerProps = {
    children: React.ReactNode;
};

export function Container({ children }: ConatinerProps) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                { children }
            </div>
        </div>
    );
};