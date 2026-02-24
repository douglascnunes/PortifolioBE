import { useQuery } from "@tanstack/react-query";
import { useState } from "react"
import { getProjectItems } from "../../../api/project";
import ProjectItem from "./ProjectItem";


export default function Project({ }) {
  const [isEditing, setIsEditing] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['recommendation'],
    queryFn: ({ signal }) => getProjectItems({ signal }),
  });

  return (
    <>
      {data?.projectitems.length > 0 &&
        data?.projectitems.map((item) => {
          <ProjectItem key={item.id} data={item} />
        })
      }
    </>
  )
}