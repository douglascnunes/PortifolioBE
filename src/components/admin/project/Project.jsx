import { useQuery } from "@tanstack/react-query";
import { getProjectItems } from "../../../api/project";
import ProjectItem from "./ProjectItem";
import { useState } from "react";
import Button from "../../common/Button";
import ProjectEditor from "./ProjectEditor";

import styles from './Project.module.css';


export default function Project({ }) {
  const [isEditing, setIsEditing] = useState(false);

  const { data } = useQuery({
    queryKey: ['project'],
    queryFn: ({ signal }) => getProjectItems({ signal }),
    enabled: false,
  });



  if (isEditing) {
    return (
      <>
        <ProjectEditor />
        <div className={styles.projectEditorBtn}>
          <Button onClick={() => setIsEditing(false)}>
            Criar Projeto
          </Button>

          <Button onClick={() => setIsEditing(false)}>
            Cancelar
          </Button>
        </div>
      </>
    )
  }


  return (
    <>
      <Button onClick={() => setIsEditing(true)}>
        Criar
      </Button>
      {data && data?.projectitems.length > 0 &&
        data?.projectitems.map((item) => {
          <ProjectItem key={item.id} data={item} />
        })
      }
    </>
  )
}