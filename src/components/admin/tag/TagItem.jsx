import styles from "./TagItem.module.css";
import Svg from "../../common/Svg";

export default function TagItem({ data, onClick, mode = 'view' }) {
  return (
    <div
      className={`${styles.container} ${styles[mode]}`}
      onClick={onClick}
    >
      <h3>{data.name}</h3>
      <Svg data={data.svg} render="tagItem" />
    </div>
  )
};