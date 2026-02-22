import { useQuery } from '@tanstack/react-query';
import { getGeneral } from '../../api/general';

import styles from './Resume.module.css';


function Resume() {

  const { data, isLoading } = useQuery({
    queryKey: ['general', 'recommendations'],
    queryFn: ({ signal }) => getGeneral({ signal }),
  });


  if (isLoading) {
    return <div>Loading...</div>;
  };

  return (
    <div className={styles.container}>

      <img src='/images/perfil.png' alt='Douglas Perfil Photo' />

      <div className={styles.graduation}>
        <img src='/images/placeholder.png' alt='IFES Logo' />
        <div>
          <h3>GRADUAÇÃO</h3>
          <span>Sistemas de Informação</span>
          <p>Instituto Federal do Espírito Santos - Campus Sera</p>
        </div>
      </div>

      <div className={styles.mainTags}>
        <div>
          <h3>Principais Tecnologias</h3>
        </div>
        <div>
          <h3>Principais Competências</h3>
        </div>
      </div>

      <div className={styles.recommendations}>
        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M15.03 9.684h3.965c.322 0 .64.08.925.232.286.153.532.374.717.645a2.109 2.109 0 0 1 .242 1.883l-2.36 7.201c-.288.814-.48 1.355-1.884 1.355-2.072 0-4.276-.677-6.157-1.256-.472-.145-.924-.284-1.348-.404h-.115V9.478a25.485 25.485 0 0 0 4.238-5.514 1.8 1.8 0 0 1 .901-.83 1.74 1.74 0 0 1 1.21-.048c.396.13.736.397.96.757.225.36.32.788.269 1.211l-1.562 4.63ZM4.177 10H7v8a2 2 0 1 1-4 0v-6.823C3 10.527 3.527 10 4.176 10Z" clipRule="evenodd" />
        </svg>
        <span>RECOMENDAÇÕES</span>
        <p>{data?.resume?.recommendations?.length || 0}</p>
      </div>

      <div className={styles.projects}>
        <div>
          <h3>Projetos em desenvolvimento</h3>
          <p>4</p>
        </div>
        <div>
          <h3>Projetos Concluído</h3>
          <p>2</p>
        </div>
      </div>

    </div>
  )
};


export default Resume;