import { useState } from "react";
import styles from './ProjectBlock.module.css';

import Button from '../../common/Button';



export default function ProjectBlock({ data, project, setProject, mode = 'create', type = 'TEXT' }) {
  const [input, setInput] = useState({
    type: 'TEXT',
    content: '',
    index: mode == 'create' ? project.content.length : data.index,
  });

  function selectType(choice) {
    setInput(prev => {
      return {
        ...prev,
        type: choice
      }
    })
  };

  function handleSave() {
    setProject({
      ...project,
      content: [...project.content, input]
    });

    setInput({
      type: 'TEXT',
      content: '',
      index: mode == 'create' ? project.content.length : data.index,
    });
  };

  let contentBlock;

  if (mode == 'create' || mode == 'edit') {
    contentBlock = (
      <div className={styles.container}>
        <div className={styles.typeButtons}>
          <Button
            onClick={() => selectType('TEXT')}
            type={input.type === 'TEXT' ? 'typeBlockPostSelected' : 'typeBlockPost'}
          >
            TEXTO
          </Button>

          <Button
            onClick={() => selectType('CODE')}
            type={input.type === 'CODE' ? 'typeBlockPostSelected' : 'typeBlockPost'}
          >
            CÓDIGO
          </Button>

          <Button
            onClick={() => selectType('IMAGE')}
            type={input.type === 'IMAGE' ? 'typeBlockPostSelected' : 'typeBlockPost'}
          >
            IMAGEM
          </Button>

          <Button
            onClick={() => selectType('GALERY')}
            type={input.type === 'GALERY' ? 'typeBlockPostSelected' : 'typeBlockPost'}
          >
            GALERIA
          </Button>

          <Button
            onClick={() => selectType('VIDEO')}
            type={input.type === 'VIDEO' ? 'typeBlockPostSelected' : 'typeBlockPost'}
          >
            VÍDEO
          </Button>
        </div>
        <textarea
          value={input.content}
          onChange={(e) => setInput(prev => ({ ...prev, content: e.target.value }))}
        />
        <Button onClick={handleSave}>Salvar</Button>
      </div>
    )
  }

  else if (type === 'TEXT' && mode == 'view') {
    contentBlock = (
      <p>{data.content}</p>
    )
  }

  else if (type === 'CODE' && mode == 'view') {
    contentBlock = (
      <img src={data.content} />
    )
  }

  else if (type === 'IMAGE' && mode == 'view') {
    contentBlock = (
      <p>{data.content}</p>
    )
  }

  else if (type === 'GALERY' && mode == 'view') {
    contentBlock = (
      <p>{data.content}</p>
    )
  }

  else if (type === 'VIDEO' && mode == 'view') {
    contentBlock = (
      <p>{data.content}</p>
    )
  }

  return (
    <>
      {contentBlock}
    </>
  )
};