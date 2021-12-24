import React from 'react';
import { FirebaseApp } from './types';
import firebase from 'firebase/app';

interface Context {
  app: FirebaseApp;
  db: firebase.firestore.Firestore;
}

const FirestoreTextEditorContext = React.createContext<Context>({} as Context);

export default FirestoreTextEditorContext;
