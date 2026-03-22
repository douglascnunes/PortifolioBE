import Button from '../../common/Button.jsx';
import styles from './Curriculum.module.css';
import SectionDivider from '../../common/SectionDivider.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../../api/queryClient.js';
import { useState } from 'react';


import CurriculumItem from './CurriculumItem.jsx';
import { createCurriculum, getCurriculums } from '../../../api/curriculum.js';






export default function Curriculum() {
  const [curriculum, setCurriculum] = useState({
    name: '',
    file: null,
  });
  const [editing, setEditing] = useState(false);


  const { data, isLoading } = useQuery({
    queryKey: ['curriculum'],
    queryFn: ({ signal }) => getCurriculums({ signal }),
  });


  const { mutate: createcurriculum, isPending } = useMutation({
    mutationFn: createCurriculum,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['curriculum'] });
      setCurriculum({
        name: '',
        file: null,
      });
    }
  });


  function handleSubmit() {
    if (!curriculum.file) {
      alert('Selecione um arquivo PDF');
      return;
    }

    const formData = new FormData();
    formData.append('name', curriculum.name);
    formData.append('file', curriculum.file);

    createcurriculum({ curriculum: formData });
  }


  const curriculumsList = isLoading ? (
    <p>Carregando currículos...</p>
  ) : (
    data.length === 0 ? (
      <p>Nenhum currículo encontrado.</p>
    ) : (
      data.curriculums.map((cur) => (
        <CurriculumItem
          key={cur.id}
          data={cur}
        // onEdit={handleEdit}
        />
      )
      )
    )
  );

  return (
    <>
      <div className={styles.admSection}>
        <div className={styles.curName}>
          <label>NOME DO CURRÍCULO</label>
          <input
            type="text"
            placeholder="Ex: Currículo 2025"
            value={curriculum.name}
            onChange={(e) => setCurriculum({ ...curriculum, name: e.target.value })}
          />
        </div>

        <div className={styles.curFile}>
          <label>ARQUIVO PDF</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setCurriculum({ ...curriculum, file: e.target.files[0] })}
          />
        </div>

        <div className={styles.buttonGroup}>
          <Button
            disabled={isPending}
            onClick={handleSubmit}
          >
            {isPending ? 'Salvando...' : 'Salvar Currículo'}
          </Button>

          <Button onClick={() => setCurriculum({ name: '', file: null })}>
            Limpar
          </Button>

        </div>
      </div>

      <SectionDivider>Currículos Adicionados</SectionDivider>

      <div className={styles.curList}>
        {curriculumsList}
      </div>
    </>
  )
}