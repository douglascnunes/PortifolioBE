import { createContext, useReducer } from "react";


export const ProjectContext = createContext({
  title: null,
  sumary: null,
  coverImage: null,
  state: null,
  content: null,
  tags: null,
  ctxIndex: null,
  setTitle: () => { },
  setSumary: () => { },
  setCoverImage: () => { },
  setState: () => { },
  addContent: () => { },
  moveContent: () => { },
  removeContent: () => { },
  toggleTag: () => { },
  setCtxIndex: () => { },
});


function projectReducer(state, action) {
  if (action.type === 'SET_TITLE') {
    return {
      ...state,
      title: action.payload,
    };
  };

  if (action.type === 'SET_SUMARY') {
    return {
      ...state,
      sumary: action.payload,
    };
  };

  if (action.type === 'SET_COVER_IMAGE') {
    return {
      ...state,
      coverImage: action.payload,
    };
  };

  if (action.type === 'SET_STATE') {
    return {
      ...state,
      state: action.payload,
    };
  };


  if (action.type === 'ADD_CONTENT') {
    const newContent = [...state.content];

    newContent.splice(action.payload.index, 0, action.payload);

    const updatedContent = newContent.map((item, index) => ({
      ...item,
      index,
    }));

    return {
      ...state,
      content: updatedContent,
    };
  };


  if (action.type === 'MOVE_CONTENT') {
    const { oldIndex, newIndex } = action.payload;

    const newContent = [...state.content];

    const [movedItem] = newContent.splice(oldIndex, 1);

    newContent.splice(newIndex, 0, movedItem);

    const updatedContent = newContent.map((item, index) => ({
      ...item,
      index
    }));

    return {
      ...state,
      content: updatedContent
    };
  }


  if (action.type === 'REMOVE_CONTENT') {
    return {
      ...state,
      content: [...state.content, action.payload],
    };
  };


  if (action.type === 'TOGGLE_TAG') {
    const currentTags = state.tags ?? [];
    const exists = currentTags.some(t => t.id === action.payload.id);

    if (exists && currentTags.length === 1) {
      return state;
    }

    const newTags = exists
      ? currentTags.filter(t => t.id !== action.payload.id)
      : [...currentTags, action.payload];

    return {
      ...state,
      tags: newTags
    };
  };


  if (action.type === 'SET_CTX_INDEX') {
    return {
      ...state,
      ctxIndex: action.payload,
    };
  };
};


export default function ProjectContextProvider({ children }) {
  const initalState = {
    title: '',
    sumary: '',
    coverImage: null,
    state: null,
    content: [],
    tags: [],
    ctxIndex: 0,
  };

  const [state, dispatch] = useReducer(projectReducer, initalState);

  function handleSetTitle(title) {
    dispatch({ type: 'SET_TITLE', payload: title });
  };

  function handleSetSumary(sumary) {
    dispatch({ type: 'SET_SUMARY', payload: sumary });
  };

  function handleSetCoverImage(coverImage) {
    dispatch({ type: 'SET_COVER_IMAGE', payload: coverImage });
  };

  function handleSetState(state) {
    dispatch({ type: 'SET_STATE', payload: state });
  };

  function handleAddContent(content) {
    dispatch({ type: 'ADD_CONTENT', payload: content });
  };

  function handleMoveContent(content, oldIndex, newIndex) {
    dispatch({ type: 'MOVE_CONTENT', payload: { content, oldIndex, newIndex } });
  };

  function handleToggleTag(tag) {
    dispatch({ type: 'TOGGLE_TAG', payload: tag });
  };

  function handleSetCtxIndex(index) {
    dispatch({ type: 'SET_CTX_INDEX', payload: index });
  };


  const ctxValue = {
    title: state.title,
    sumary: state.sumary,
    coverImage: state.coverImage,
    state: state.state,
    content: state.content,
    tags: state.tags,
    ctxIndex: state.ctxIndex,
    setTitle: handleSetTitle,
    setSumary: handleSetSumary,
    setCoverImage: handleSetCoverImage,
    setState: handleSetState,
    addContent: handleAddContent,
    moveContent: handleMoveContent,
    toggleTag: handleToggleTag,
    setCtxIndex: handleSetCtxIndex
  };

  return (
    <ProjectContext.Provider value={ctxValue}>
      {children}
    </ProjectContext.Provider>
  )
};
