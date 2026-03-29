import Button from '../../../common/Button.jsx';
import styles from './Skill.module.css';
import SectionDivider from '../../../common/SectionDivider.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createTag, getSkills, updateTag } from '../../../../api/tag.js';
import { queryClient } from '../../../../api/queryClient.js';
import { useState } from 'react';
import Input from '../../../common/Input.jsx';


import SkillItem from './SkillItem.jsx';
import { TAG_TYPE } from '../../../../util/enum.jsx';
import Svg from '../../../common/Svg.jsx';


export default function Skill() {
  const [skill, setSkill] = useState({
    id: null,
    name: '',
    svg: '',
    type: TAG_TYPE[1],
  });
  const [editing, setEditing] = useState(false);


  const { data, isLoading } = useQuery({
    queryKey: ['skill'],
    queryFn: ({ signal }) => getSkills({ signal }),
  });


  const { mutate: createSkill } = useMutation({
    mutationFn: createTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skill'] });
      setSkill({
        id: null,
        name: '',
        description: '',
        svg: '',
        type: TAG_TYPE[1],
      });
    }
  });

  const { mutate: updateSkill } = useMutation({
    mutationFn: updateTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skill'] });
      setSkill({
        id: null,
        name: '',
        description: '',
        svg: '',
        type: TAG_TYPE[1],
      });
    }
  });

  function handleSubmit(mode) {
    if (!skill.svg && !editing) {
      alert('Selecione um arquivo SVG');
      return;
    };

    if (mode === 'edit' && skill.id !== null) {
      updateSkill({ tag: skill });
      setEditing(false);
      return;
    }

    createSkill({ tag: skill });
    setEditing(false);
  };

  function handleEdit(s) {
    setEditing(true);

    setSkill({
      id: s.id,
      name: s.name,
      svg: s.svg,
      type: TAG_TYPE[1],
    });
  };

  function handleCancel() {
    setSkill({
      id: null,
      name: '',
      description: '',
      svg: '',
      type: TAG_TYPE[1],
    });
    setEditing(false);
  };

  let skillList;

  if (isLoading) {
    skillList = <p>Carregando Habilidades...</p>;
  }

  else if (!data?.skills || data.skills.length === 0) {
    skillList = <p>Nenhuma habilidade encontrada.</p>;
  }

  else {
    skillList = data.skills.map((skill) => (
      <SkillItem key={skill.id} data={skill} onEdit={() => handleEdit(skill)} />
    ));
  }

  return (
    <>
      <div className={styles.admSection}>
        <div className={styles.recName}>
          <label>NOME DA HABILIDADE</label>
          <Input
            type="text"
            valueName='name'
            value={skill.name}
            placeholder="Nome da habilidade"
            onChangeFn={setSkill}
          />
        </div>

        <div className={styles.recIconInput}>
          <label>ÍCONE</label>
          <Input
            type="file"
            valueName="svg"
            accept='image/svg+xml'
            onChangeFn={setSkill}
          />
        </div>

        <div className={styles.recIconPreview}>
          <label>IMAGEM:</label>
          {!skill.svg && (
            <img className={styles.iconPreview} src='/images/placeholder.png' alt="preview" />
          )}
          {skill.svg && (
            <Svg data={skill.svg} render='tagPreview'/>
          )}
        </div>

        <div className={styles.buttonGroup}>
          <Button
            onClick={() => handleSubmit(editing ? 'edit' : 'create')}>
            {editing ? 'Atualizar Habilidade' : 'Salvar Habilidade'}
          </Button>

          <Button
            onClick={() => handleCancel({ skill })}>
            {editing ? 'Cancelar Edição' : 'Limpar'}
          </Button>

        </div>
      </div>

      <SectionDivider>Habilidades Criadas</SectionDivider>

      <div className={styles.recList}>
        {skillList}
      </div>
    </>
  )
}
