import { useState } from "react";

import styles from './ProjectEditor.module.css';
import ProjectBlock from "./ProjectBlock";
import Input from "../../common/Input";
import TextArea from "../../common/TextArea";
import { PROJECT_STATE } from "../../../util/enum";
import Select from "../../common/Select";


export default function ProjectEditor({ }) {
  const [project, setProject] = useState({
    title: '',
    sumary: '',
    converImage: '',
    state: PROJECT_STATE.DEVELOPMENT.label,
    content: []
  });

  console.log(project)


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Input
          type='text'
          value={project.title}
          valueName='title'
          onChangeFn={setProject}
          placeholder='Título do Projeto'
          render='title'
        />

        <TextArea
          value={project.sumary}
          onChangeFn={setProject}
          placeholder='Escreva um parágrafo introdutório para o projeto'
          render='sumary'
        />

        <Input
          type='file'
          accept='application/pdf'
          onChangeFn={setProject}
        />

        <img className={styles.coverPreview} src={project.coverPreview} />

        <Select
          value={project.state}
          onChangeFn={setProject}
          list={PROJECT_STATE}
        />
      </div>

      {project.content.length > 0 &&
        project.content.map((c, index) => (
          <ProjectBlock key={index} data={c} project={project} setProject={setProject} mode='view' />
        ))
      }
      <ProjectBlock project={project} setProject={setProject} />
    </div>
  )
}