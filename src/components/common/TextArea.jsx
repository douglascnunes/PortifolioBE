import styles from './TextArea.module.css';

export default function TextArea({
  value,
  valueName,
  onChangeFn,
  placeholder = 'Digite',
  render = 'form'
}) {

  function updateValue(val) {
    const limited = val.slice(0, 500);

    if (valueName) {
      onChangeFn(prev => ({
        ...prev,
        [valueName]: limited
      }));
    } else {
      onChangeFn(limited);
    }
  }

  function handleChange(e) {
    updateValue(e.target.value);
  }

  return (
    <textarea
      value={value}
      maxLength={500}
      onChange={handleChange}
      className={`${styles.textarea} ${styles[render]}`}
      placeholder={placeholder}
    />
  );
}