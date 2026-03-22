import { useMutation } from '@tanstack/react-query';
import Button from '../../common/Button';
import styles from './CurriculumItem.module.css';
import { queryClient } from '../../../api/queryClient';
import { activeCurriculum, deleteCurriculum } from '../../../api/curriculum';


export default function CurriculumItem({ data, onEdit }) {
  const { mutate: deletecurriculum } = useMutation({
    mutationFn: deleteCurriculum,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['curriculum'] });
    }
  });

  const { mutate: activecurriculum } = useMutation({
    mutationFn: activeCurriculum,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['curriculum'] });
    }
  });


  const createAt = new Date(data.createdAt);

  return (
    <div className={styles.container}>

      <div className={styles.name}>
        <span>Nome: </span>
        <span>{data.name}</span>
      </div>

      <div className={styles.date}>
        <span>Upload: </span>
        <span>{`${createAt.toLocaleDateString()} às ${createAt.toLocaleTimeString()}`}</span>
      </div>

      <div className={styles.buttons}>

        <Button
          className={styles.deleteBtn}
          type="icon"
          onClick={() => activecurriculum({ curriculumID: data.id })}
        >
          {data.isActive ? (
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
              <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          )}
        </Button>

        <Button
          className={styles.deleteBtn}
          type="icon"
          onClick={() => deletecurriculum({ curriculumID: data.id })}
        >
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clipRule="evenodd" />
          </svg>

        </Button>
      </div>
    </div>
  )
}