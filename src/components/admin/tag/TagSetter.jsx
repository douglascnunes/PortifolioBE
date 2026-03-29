import { useContext, useState } from 'react';
import styles from './TagSetter.module.css';
import TagPickerModal from './TagPickerModal';
import Button from '../../common/Button';
import { TAG_TYPE } from '../../../util/enum';
import TagItem from './TagItem';
import { useQuery } from '@tanstack/react-query';
import { getTags } from '../../../api/tag';
import { ProjectContext } from '../../../store/project-context';


export default function TagSetter({ type }) {
  const { tags: projectTags } = useContext(ProjectContext);

  const [isOpenModal, setIsOpenModal] = useState(false);

  function openModal() {
    setIsOpenModal(true);
  };

  function closeModal() {
    setIsOpenModal(false);
  };

  const label = type === TAG_TYPE[0] ? 'Tecnologias' : 'Habilidades';


  return (
    <>
      <TagPickerModal
        isOpenModal={isOpenModal}
        closeModal={closeModal}
        type={type}
      />

      <div className={styles.container}>
        <label>{label}</label>
        <Button onClick={openModal}>Adicionar {label}</Button>
        <div className={styles.tags}>
          {projectTags && projectTags.length === 0 && <p>Nenhuma {label} associada.</p>}

          {projectTags && projectTags.map(tag => {
            if (tag.type !== type) return null;

            return <TagItem key={tag.id} data={tag} />
          })}
        </div>
      </div>
    </>
  )
};