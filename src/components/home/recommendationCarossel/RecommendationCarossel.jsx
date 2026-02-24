import { useQuery } from "@tanstack/react-query";
import RecommendationCard from "./RecommendationCard";
import { getRecommendations } from "../../../api/recommendation";


import styles from './RecommendationCarossel.module.css';
import { useMemo, useState } from "react";
import { shuffle } from "../../../util/array";



export default function RecommendationCarossel() {
  const [index, setIndex] = useState(0);


  const { data, isLoading } = useQuery({
    queryKey: ['recommendations'],
    queryFn: ({ signal }) => getRecommendations({ signal }),
  });

  const shuffledRecommendations = useMemo(() => {
    if (!data?.recommendations) return [];
    return shuffle(data.recommendations);
  }, [data]);


  return (
    <div className={styles.container}>
      <button
        className={styles.arrowButton}
        onClick={() => setIndex((prev) => prev - 1)} disabled={index <= 0}
      >
        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M13.729 5.575c1.304-1.074 3.27-.146 3.27 1.544v9.762c0 1.69-1.966 2.618-3.27 1.544l-5.927-4.881a2 2 0 0 1 0-3.088l5.927-4.88Z" clipRule="evenodd" />
        </svg>
      </button>

      <div className={styles.carosselHidden}>
        <div className={styles.cardsContainer}
          style={{
            transform: `translateX(calc(-${index} * ((100% - 2rem) / 3 + 1rem)))`,
          }}
        >
          {isLoading ? (
            <p>Carregando recomendações...</p>
          ) : (
            data?.recommendations?.length > 0 ? (
              shuffledRecommendations.map((rec) => (
                <RecommendationCard key={rec.id} data={rec} />
              ))
            ) : (
              <p>Nenhuma recomendação encontrada.</p>
            )
          )}
        </div>
      </div>

      <button
        className={styles.arrowButton}
        onClick={() => setIndex((prev) => prev + 1)} disabled={index >= (data?.recommendations?.length || 0) - 3}
      >
        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M10.271 5.575C8.967 4.501 7 5.43 7 7.12v9.762c0 1.69 1.967 2.618 3.271 1.544l5.927-4.881a2 2 0 0 0 0-3.088l-5.927-4.88Z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}