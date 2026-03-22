import styles from './Select.module.css';


export default function Select({
  value,
  onChangeFn,
  list
}) {

  return (
    <select className={styles.select}
      value={value}
      onChange={(e) => onChangeFn(prev => ({ ...prev, state: e.target.value }))}
    >
      {Object.entries(list).map(([key, { label }]) => (
        <option className={styles.option} key={key} value={key}>
          {label}
        </option>
      ))}
    </select>
  )
}