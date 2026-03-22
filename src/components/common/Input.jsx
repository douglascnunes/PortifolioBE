import styles from './Input.module.css';


export default function Input({
  value,
  valueName,
  onChangeFn,
  type = 'text',
  placeholder = 'Digite',
  render = 'form',
  accept = null,
}) {


  function handleChange(e) {
    if (type === 'file' && accept) {
      const file = e.target.files[0];

      onChangeFn(prev => ({
        ...prev,
        file: file,
        preview: URL.createObjectURL(file)
      }));

      return;
    }

    const val = e.target.value;

    onChangeFn(prev => ({
      ...prev,
      [valueName]: val.slice(0, 40)
    }));
  }



  return (
    <input
      className={`${styles.input} ${styles[render]}`}
      type={type}
      value={type !== 'file' ? value : undefined}
      onChange={(e) => handleChange(e)}
      placeholder={type !== 'file' ? placeholder : undefined}
      accept={type === 'file' ? accept : undefined}
    />
  )
}