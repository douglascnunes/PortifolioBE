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


  function updateValue(val) {
    if (valueName) {
      onChangeFn(prev => ({
        ...prev,
        [valueName]: val,
      }));
    } else {
      onChangeFn(val);
    }
  };

  function handleTextChange(e) {
    updateValue(e.target.value.slice(0, 40));
  }


  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    // SVG
    if (accept === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = () => {
        updateValue(reader.result);
      };
      reader.readAsText(file);
      return;
    }

    // Normal FIle
    updateValue({
      file,
      preview: URL.createObjectURL(file),
    });
  }

  function handleChange(e) {
    if (type === 'file') {
      handleFileChange(e);
    } else {
      handleTextChange(e);
    }
  };



  return (
    <input
      className={`${styles.input} ${styles[render]}`}
      type={type}
      value={type !== 'file' ? value : undefined}
      onChange={handleChange}
      placeholder={type !== 'file' ? placeholder : undefined}
      accept={type === 'file' ? accept : undefined}
    />
  )
}