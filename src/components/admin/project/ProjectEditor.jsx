import { useContext, useState } from "react";

import styles from './ProjectEditor.module.css';
import ProjectBlock from "./ProjectBlock";
import Input from "../../common/Input";
import TextArea from "../../common/TextArea";
import { PROJECT_STATE, TAG_TYPE } from "../../../util/enum";
import Select from "../../common/Select";
import TagSetter from "../tag/TagSetter";
import { useQuery } from "@tanstack/react-query";
import { getTags } from "../../../api/tag";
import { ProjectContext } from "../../../store/project-context";


export default function ProjectEditor({ }) {
  const {
    title, setTitle,
    sumary, setSumary,
    state, setState,

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
        {/* 
        <Input
          type='file'
          accept='application/pdf'
          onChangeFn={setProject}
        /> */}

        {/* <img className={styles.coverPreview} src={project.coverPreview} /> */}
        {/* 
        <Select
          value={state}
          onChangeFn={setState}
          list={PROJECT_STATE}
        /> */}

        <TagSetter type={TAG_TYPE[0]} />
        <TagSetter type={TAG_TYPE[1]} />
      </div>


      {/* {project.content.length > 0 &&
        project.content.map((c, index) => (
          <ProjectBlock key={index} data={c} project={project} setProject={setProject} mode='view' />
        ))
      }
      <ProjectBlock project={project} setProject={setProject} /> */}
    </div>
  )
}