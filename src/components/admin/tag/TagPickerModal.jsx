import { useContext, useEffect, useRef } from 'react';
import styles from './TagPickerModal.module.css'
import TagItem from './TagItem';
import { ProjectContext } from '../../../store/project-context';
import { useQuery } from '@tanstack/react-query';
import { TAG_TYPE } from '../../../util/enum';
import { getSkills, getTechs } from '../../../api/tag';


export default function TagPickerModal({ isOpenModal, closeModal, type }) {
  const { tags: projectTags, toggleTag } = useContext(ProjectContext);
  const modalRef = useRef();

  const { data: fetchedTags } = useQuery({
    queryKey: ['tag', type],
    queryFn: type === TAG_TYPE[0] ?
      ({ signal }) => getTechs({ signal }) :
      ({ signal }) => getSkills({ signal })
  });

  const filteredTags = fetchedTags?.tags?.filter(tag => !projectTags.some(projectTag => projectTag.id === tag.id));

  useEffect(() => {
    const handleClickOutside = e => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };
    if (isOpenModal) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpenModal, closeModal]);

  if (!isOpenModal) return null;

  return (
    <div className={styles.overlay}>

      <div className={styles.modal} ref={modalRef}>
        <h3>{type === 'TECH' ? 'Definir Tecnologias' : 'Definir Habilidades'}</h3>

        <div className={styles.avaliableTagsContaienr}>
          <h4>Tecnologias disponiveis</h4>
          <div className={styles.avaliableTags}>
            {filteredTags ?
              (filteredTags.map(tag => (
                <TagItem
                  key={tag.id}
                  data={tag}
                  mode='picker'
                  onClick={() => toggleTag(tag)}
                />
              )))
              :
              <p>Carregando...</p>
            }
          </div>
        </div>

        <div className={styles.selectedTagsContaienr}>
          <h4>Tecnologias selecionadas</h4>
          <div className={styles.selectedTags}>
            {projectTags ?
              (projectTags.filter(tag => tag.type === type).map(tag => (
                <TagItem
                  key={tag.id}
                  data={tag}
                  mode='picker'
                  onClick={() => toggleTag(tag)}
                />
              )))
              :
              <p>Nenhuma tag selecionada</p>
            }
          </div>
        </div>


      </div>

    </div >
  )
}