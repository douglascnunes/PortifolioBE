import styles from './Svg.module.css';


export default function Svg({
  data,
  render = 'default',
}) {

  return (
    <div
      className={`${styles.container} ${styles[render]}`}
      dangerouslySetInnerHTML={{ __html: data }}
    />
  );
}