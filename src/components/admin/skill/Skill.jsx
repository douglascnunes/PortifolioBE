import Button from '../../common/Button.jsx';
import styles from './Skill.module.css';
import SectionDivider from '../../common/SectionDivider.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createTag, getSkills, updateTag } from '../../../api/tag.js';
import { queryClient } from '../../../api/queryClient.js';
import { useState } from 'react';
import Input from '../../common/Input.jsx';


import SkillItem from './SkillItem.jsx';
import { TAG_TYPE } from '../../../util/enum.jsx';


export default function Skill() {
  const [skill, setSkill] = useState({
    id: null,
    name: '',
    // description: '',
    file: null,
    type: TAG_TYPE[1],
  });
  const [editing, setEditing] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['skill'],
    queryFn: ({ signal }) => getSkills({ signal }),
  });

  const { mutate: createtag } = useMutation({
    mutationFn: createTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skill'] });
      setSkill({
        id: null,
        name: '',
        description: '',
        file: null,
        type: TAG_TYPE[1],
      });
    }
  });

  const { mutate: updatetag } = useMutation({
    mutationFn: updateTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skill'] });
      setSkill({
        id: null,
        name: '',
        description: '',
        file: null,
        type: TAG_TYPE[1],
      });
    }
  });

  function handleSubmit() {
    if (!skill.file) {
      alert('Selecione um arquivo PDF');
      return;
    }

    const formData = new FormData();
    formData.append('name', skill.name);
    formData.append('file', skill.file);
    formData.append('type', skill.type);

    createtag({ tag: formData });
  }

  function handleEdit(s) {
    setSkill({
      id: s.id,
      name: s.name,
      // description: rec.description,
      file: s.file,
      type: TAG_TYPE[1],
    });

    setEditing(true);
    console.log(skill)
  };

  function handleCancel() {
    setSkill({
      id: null,
      name: '',
      description: '',
      file: null,
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
      <SkillItem key={skill.id} data={skill} onEdit={handleEdit} />
    ));
  }

  return (
    <>
      <div className={styles.admSection}>
        <div className={styles.recTitle}>
          <label>NOME DA HABILIDADE</label>
          <Input
            type="text"
            valueName='name'
            value={skill.name}
            placeholder="Nome da habilidade"
            onChangeFn={setSkill}
          />
        </div>

        <div className={styles.recTitle}>
          <label>ÍCONE</label>
          <Input
            type="file"
            accept='image/svg+xml'
            onChangeFn={setSkill}
          />
        </div>

        <div className={styles.buttonGroup}>
          <Button
            onClick={handleSubmit}>
            {editing ? 'Atualizar habilidade' : 'Salvar habilidade'}
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