import { useContext, useState } from "react";
import styles from './ProjectInput.module.css';

import Button from '../../common/Button';
import { ProjectContext } from "../../../store/project-context";



export default function ProjectInput({ index, renderIndex }) {
  const {
    content, addContent,
    ctxIndex, setCtxIndex,
  } = useContext(ProjectContext);

  const [input, setInput] = useState({
    type: 'TEXT',
    content: '',
    index: index,
    clientId: crypto.randomUUID(),
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
    addContent(input);
    setInput({
      type: 'TEXT',
      content: '',
      index: index,
      clientId: crypto.randomUUID(),
    });
    setCtxIndex(content.length * 2 + 1);
  };


  return (
    <>
      {
        renderIndex === ctxIndex ? (
          <div className={styles.container}>
            <span>index: {index}</span>
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
            <Button onClick={handleSave} >Salvar</Button>
          </ div>
        ) : (
          <Button type="typeBlockPost" onClick={() => setCtxIndex(renderIndex)}> {/*Adicionar*/}
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" clipRule="evenodd" />
            </svg>
          </Button>
        )}
    </>
  )
};