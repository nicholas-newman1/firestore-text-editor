import React from 'react';
import FirestoreTextEditor from './FirestoreTextEditorContext';
import { FirebaseApp, ProviderProps } from './types';

const FirestoreTextEditorProvider: React.FC<ProviderProps> = props => {
  const db = (props.app as FirebaseApp).firestore();

  return (
    <FirestoreTextEditor.Provider value={{ ...props, db }}>
      {props.children}
    </FirestoreTextEditor.Provider>
  );
};

export default FirestoreTextEditorProvider;
