import styles from './Button.module.css';


function Button({ children, onClick, disabled, type = "high" }) {
  return (
    <button className={`${styles.button} ${styles[type]}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
};

export default Button;