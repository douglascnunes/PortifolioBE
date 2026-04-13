import { useContext } from 'react';
import Button from '../../common/Button';
import styles from './ProjectBlock.module.css';
import { ProjectContext } from '../../../store/project-context';
import { motion } from "framer-motion";


export default function ProjectBlock({ data, type = 'TEXT', active }) {
  const { moveContent } = useContext(ProjectContext);

  let contentBlock;

  if (type === 'TEXT' && data.index !== active) {
    contentBlock = (
      <p>{data.content}</p>
    )
  }

  else if (type === 'CODE' && data.index !== active) {
    contentBlock = (
      <img src={data.content} />
    )
  }

  else if (type === 'IMAGE' && data.index !== active) {
    contentBlock = (
      <p>{data.content}</p>
    )
  }

  else if (type === 'GALERY' && data.index !== active) {
    contentBlock = (
      <p>{data.content}</p>
    )
  }

  else if (type === 'VIDEO' && data.index !== active) {
    contentBlock = (
      <p>{data.content}</p>
    )
  }



  return (

    <motion.div className={styles.container}
      layout
      transition={{
        duration: 0.25,
        ease: "easeInOut"
      }}
    >

      <div className={styles.header}>
        <div className={styles.info}>
          <label>Index:</label>
          <span>{data.index}</span>
        </div>
        <div className={styles.info}>
          <label>Type:</label>
          <span>{data.type}</span>
        </div>

        <div className={styles.controls}>
          <Button type="icon"> {/*Editar*/}
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clipRule="evenodd" />
            </svg>

          </Button>
          <Button type="icon"> {/*Excluir*/}
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clipRule="evenodd" />
            </svg>
          </Button>
          <Button onClick={() => moveContent(data, data.index, data.index - 1)} type="icon"> {/*Subir*/}
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M5.575 13.729C4.501 15.033 5.43 17 7.12 17h9.762c1.69 0 2.618-1.967 1.544-3.271l-4.881-5.927a2 2 0 0 0-3.088 0l-4.88 5.927Z" clipRule="evenodd" />
            </svg>
          </Button>
          <Button onClick={() => moveContent(data, data.index, data.index + 1)} type="icon"> {/*Descer*/}
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M18.425 10.271C19.499 8.967 18.57 7 16.88 7H7.12c-1.69 0-2.618 1.967-1.544 3.271l4.881 5.927a2 2 0 0 0 3.088 0l4.88-5.927Z" clipRule="evenodd" />
            </svg>
          </Button>
        </div>
      </div>

      {contentBlock}
    </ motion.div>
  )
};