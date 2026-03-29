import { createContext, useReducer } from "react";


export const ProjectContext = createContext({
  title: null,
  sumary: null,
  coverImage: null,
  state: null,
  content: null,
  tags: null,
  setTitle: () => { },
  setSumary: () => { },
  setCoverImage: () => { },
  setState: () => { },
  setContent: () => { },
  setTag: () => { },
  toggleTag: () => { },
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

  if (action.type === 'SET_CONTENT') {
    return {
      ...state,
      content: action.payload,
    };
  };

  if (action.type === 'SET_TAG') {
    return {
      ...state,
      tags: action.payload,
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
};


export default function ProjectContextProvider({ children }) {
  const initalState = {
    title: '',
    sumary: '',
    coverImage: null,
    state: null,
    content: [],
    tags: []
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

  function handleSetContent(content) {
    dispatch({ type: 'SET_CONTENT', payload: content });
  };

  function handleSetTag(tag) {
    dispatch({ type: 'SET_TAG', payload: tag });
  };

  function handleToggleTag(tag) {
    dispatch({ type: 'TOGGLE_TAG', payload: tag });
  };


  const ctxValue = {
    title: state.title,
    sumary: state.sumary,
    coverImage: state.coverImage,
    state: state.state,
    content: state.content,
    tags: state.tags,
    setTitle: handleSetTitle,
    setSumary: handleSetSumary,
    setCoverImage: handleSetCoverImage,
    setState: handleSetState,
    setContent: handleSetContent,
    setTag: handleSetTag,
    toggleTag: handleToggleTag
  };

  return (
    <ProjectContext.Provider value={ctxValue}>
      {children}
    </ProjectContext.Provider>
  )
};
