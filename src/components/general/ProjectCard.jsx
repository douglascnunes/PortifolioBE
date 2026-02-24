import styles from './ProjectCard.module.css';


export default function ProjectCard({ data }) {
  return (
    <div className={styles.container}>
      <h3>{data.title}</h3>
    </div>
  )
}