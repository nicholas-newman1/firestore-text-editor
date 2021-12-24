import React from 'react';
import FirestoreTextEditor from './FirestoreTextEditorContext';
import { FirebaseApp } from './types';

interface Props {
  app: FirebaseApp;
}

const FirestoreTextEditorProvider: React.FC<Props> = ({ app, children }) => {
  const db = app.firestore();

  return (
    <FirestoreTextEditor.Provider value={{ app, db }}>
      {children}
    </FirestoreTextEditor.Provider>
  );
};

export default FirestoreTextEditorProvider;
