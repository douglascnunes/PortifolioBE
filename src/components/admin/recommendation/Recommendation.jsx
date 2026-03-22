import Button from '../../common/Button.jsx';
import styles from './Recommendation.module.css';
import SectionDivider from '../../common/SectionDivider.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createRecommendation, getRecommendations, updateRecommendation } from '../../../api/recommendation.js';
import { queryClient } from '../../../api/queryClient.js';
import { useState } from 'react';


import RecommendationItem from './RecommendationItem.jsx';


export default function Recommendation() {
  const [recommendation, setRecommendation] = useState({
    id: null,
    title: '',
    author: '',
    description: '',
  });
  const [editing, setEditing] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['recommendation'],
    queryFn: ({ signal }) => getRecommendations({ signal }),
  });

  const { mutate: createrecommendation } = useMutation({
    mutationFn: createRecommendation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recommendation'] });
      setRecommendation({
        title: '',
        author: '',
        description: '',
      });
    }
  });

  const { mutate: updaterecommendation } = useMutation({
    mutationFn: updateRecommendation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recommendation'] });
      setRecommendation({
        title: '',
        author: '',
        description: '',
      });
    }
  });

  function handleEdit(rec) {
    setRecommendation({
      id: rec.id,
      title: rec.title,
      author: rec.author,
      description: rec.description,
    });
    setEditing(true);
  };

  function handleCancel() {
    setRecommendation({
      id: null,
      title: '',
      author: '',
      description: '',
    });
    setEditing(false);
  };

  const recommendationsList = isLoading ? (
    <p>Carregando recomendações...</p>
  ) : (
    data.length === 0 ? (
      <p>Nenhuma recomendação encontrada.</p>
    ) : (
      data.recommendations.map((rec) => (
        <RecommendationItem
          key={rec.id}
          data={rec}
          onEdit={handleEdit}
        />
      )
      )
    )
  );

  return (
    <>
      <div className={styles.admSection}>
        <div className={styles.recTitle}>
          <label>TÍTULO</label>
          <input
            type="text"
            placeholder="Título da recomendação"
            value={recommendation.title}
            onChange={(e) => setRecommendation({ ...recommendation, title: e.target.value })}
          />
        </div>
        <div className={styles.recText}>
          <label>RECOMENDAÇÃO</label>
          <textarea
            placeholder="Escreva a recomendação aqui..."
            value={recommendation.description}
            onChange={(e) => setRecommendation({ ...recommendation, description: e.target.value })}
          />
        </div>
        <div className={styles.recAuthor}>
          <label>NOME DO AUTOR</label>
          <input
            type="text"
            placeholder="Nome do autor da recomendação"
            value={recommendation.author}
            onChange={(e) => setRecommendation({ ...recommendation, author: e.target.value })}
          />
        </div>

        <div className={styles.buttonGroup}>
          <Button
            onClick={() =>
              editing ? updaterecommendation({ recommendation })
                : createrecommendation({ recommendation })
            }>
            {editing ? 'Atualizar Recomendação' : 'Salvar Recomendação'}
          </Button>

          <Button
            onClick={() => handleCancel({ recommendation })}>
            {editing ? 'Cancelar Edição' : 'Limpar'}
          </Button>

        </div>
      </div>

      <SectionDivider>Recomendações Criadas</SectionDivider>

      <div className={styles.recList}>
        {recommendationsList}
      </div>
    </>
  )
}