import styles from './SectionDivider.module.css';

function SectionDivider({ children }) {
  return (
    <div className={styles.sectionDivider}>
      <span className={styles.line} />
      <span className={styles.text}>{children}</span>
      <span className={styles.line} />
    </div>
  );
}

export default SectionDivider;
