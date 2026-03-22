import styles from './TextArea.module.css';


export default function TextArea({
  value,
  onChangeFn,
  placeholder = 'Digite',
  render = 'form'
}) {


  function helpOnchangeFn(value) {
    onChangeFn(prev => ({
      ...prev,
      sumary: value.slice(0, 500)
    }));
  }


  return (
    <textarea
      value={value}
      maxLength={500}
      onChange={(e) => helpOnchangeFn(e.target.value)}
      className={`${styles.textarea} ${styles[render]}`}
      placeholder={placeholder}
    />
  )
}