import styles from './RecommendationCard.module.css';


export default function RecommendationCard({data}) {
  return (
    <div className={styles.container}>
      <h3>{data.title}</h3>
      <p>{data.description}</p>
      <span>{data.author}</span>
    </div>
  );
};