import React from 'react';
import FirestoreTextEditor from './FirestoreTextEditorContext';
import { FirebaseApp } from './types';

interface Props {
  app: any;
}

const FirestoreTextEditorProvider: React.FC<Props> = ({ app, children }) => {
  const db = (app as FirebaseApp).firestore();

  return (
    <FirestoreTextEditor.Provider value={{ app, db }}>
      {children}
    </FirestoreTextEditor.Provider>
  );
};

export default FirestoreTextEditorProvider;
