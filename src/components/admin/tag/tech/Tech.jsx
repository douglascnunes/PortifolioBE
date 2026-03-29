import Button from '../../../common/Button.jsx';
import styles from './Tech.module.css';
import SectionDivider from '../../../common/SectionDivider.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createTag, getTechs, updateTag } from '../../../../api/tag.js';
import { queryClient } from '../../../../api/queryClient.js';
import { useState } from 'react';
import Input from '../../../common/Input.jsx';


import TechItem from './TechItem.jsx';
import { TAG_TYPE } from '../../../../util/enum.jsx';
import Svg from '../../../common/Svg.jsx';


export default function Tech() {
  const [tech, setTech] = useState({
    id: null,
    name: '',
    svg: '',
    type: TAG_TYPE[0],
  });
  const [editing, setEditing] = useState(false);


  const { data, isLoading } = useQuery({
    queryKey: ['tech'],
    queryFn: ({ signal }) => getTechs({ signal }),
  });


  const { mutate: createtag } = useMutation({
    mutationFn: createTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tech'] });
      setTech({
        id: null,
        name: '',
        description: '',
        svg: '',
        type: TAG_TYPE[0],
      });
    }
  });

  const { mutate: updatetag } = useMutation({
    mutationFn: updateTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tech'] });
      setTech({
        id: null,
        name: '',
        description: '',
        svg: '',
        type: TAG_TYPE[0],
      });
    }
  });

  function handleSubmit(mode) {
    if (!tech.svg && !editing) {
      alert('Selecione um arquivo SVG');
      return;
    };

    if (mode === 'edit' && tech.id !== null) {
      updatetag({ tag: tech });
      setEditing(false);
      return;
    }

    createtag({ tag: tech });
    setEditing(false);
  };

  function handleEdit(s) {
    setEditing(true);

    setTech({
      id: s.id,
      name: s.name,
      svg: s.svg,
      type: TAG_TYPE[0],
    });
  };

  function handleCancel() {
    setTech({
      id: null,
      name: '',
      description: '',
      svg: '',
      type: TAG_TYPE[0],
    });
    setEditing(false);
  };

  let techList;

  if (isLoading) {
    techList = <p>Carregando Tecnologias...</p>;
  }

  else if (!data?.techs || data.techs.length === 0) {
    techList = <p>Nenhuma tecnologia encontrada.</p>;
  }

  else {
    techList = data.techs.map((tech) => (
      <TechItem key={tech.id} data={tech} onEdit={() => handleEdit(tech)} />
    ));
  }

  return (
    <>
      <div className={styles.admSection}>
        <div className={styles.recName}>
          <label>NOME DA TECNOLOGIA</label>
          <Input
            type="text"
            valueName='name'
            value={tech.name}
            placeholder="Nome da tecnologia"
            onChangeFn={setTech}
          />
        </div>

        <div className={styles.recIconInput}>
          <label>ÍCONE</label>
          <Input
            type="file"
            valueName="svg"
            accept='image/svg+xml'
            onChangeFn={setTech}
          />
        </div>

        <div className={styles.recIconPreview}>
          <label>IMAGEM:</label>
          {!tech.svg && (
            <img className={styles.iconPreview} src='/images/placeholder.png' alt="preview" />
          )}
          {tech.svg && (
            <Svg data={tech.svg} render='tagPreview'/>
          )}
        </div>

        <div className={styles.buttonGroup}>
          <Button
            onClick={() => handleSubmit(editing ? 'edit' : 'create')}>
            {editing ? 'Atualizar Tecnologia' : 'Salvar Tecnologia'}
          </Button>

          <Button
            onClick={() => handleCancel({ tech })}>
            {editing ? 'Cancelar Edição' : 'Limpar'}
          </Button>

        </div>
      </div>

      <SectionDivider>Tecnologias Criadas</SectionDivider>

      <div className={styles.recList}>
        {techList}
      </div>
    </>
  )
}