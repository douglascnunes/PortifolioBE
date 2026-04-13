import { useContext } from "react";

import styles from './ProjectEditor.module.css';
import ProjectBlock from "./ProjectBlock";
import Input from "../../common/Input";
import TextArea from "../../common/TextArea";
import { TAG_TYPE } from "../../../util/enum";
import TagSetter from "../tag/TagSetter";
import { ProjectContext } from "../../../store/project-context";
import ProjectInput from "./ProjectInput";


export default function ProjectEditor({ }) {
  const {
    title, setTitle,
    sumary, setSumary,
    content, setContent,
  } = useContext(ProjectContext);


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Input
          type='text'
          value={title}
          onChangeFn={setTitle}
          placeholder='Título do Projeto'
          render='title'
        />

        <TextArea
          value={sumary}
          onChangeFn={setSumary}
          placeholder='Escreva um parágrafo introdutório para o projeto'
          render='sumary'
        />


        <TagSetter type={TAG_TYPE[0]} />
        <TagSetter type={TAG_TYPE[1]} />
      </div>

      {content.length > 0 ? (
        content.map((cont, index) => (
          <div className={styles.content} key={cont.id ?? cont.clientId}>
            <ProjectBlock
              data={cont}
              index={index}
              renderIndex={index * 2}
            />

            <ProjectInput
              index={index + 1}
              renderIndex={(index * 2) + 1}
            />
          </div>
        ))
      ) : (
        <ProjectInput index={0} renderIndex={0} />
      )}

    </div>
  )
}