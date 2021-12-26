import React, { CSSProperties, FunctionComponent, ReactElement } from 'react';
import { FirebaseApp } from './types';
import firebase from 'firebase/app';

interface Context {
  app: FirebaseApp;
  db: firebase.firestore.Firestore;
  loader?: ReactElement;
  SaveButton?: FunctionComponent<{ onClick: () => any; disabled?: boolean }>;
  EditButton?: FunctionComponent<{ onClick: () => any }>;
  CancelButton?: FunctionComponent<{ onClick: () => any }>;
  saveButtonStyle?: CSSProperties;
  saveIconStyle?: CSSProperties;
  editButtonStyle?: CSSProperties;
  editIconStyle?: CSSProperties;
  cancelButtonStyle?: CSSProperties;
  cancelIconStyle?: CSSProperties;
  wrapperStyle?: CSSProperties | ((editing: boolean) => CSSProperties);
  editorStyle?: CSSProperties | ((editing: boolean) => CSSProperties);
  toolbarStyle?: CSSProperties | ((editing: boolean) => CSSProperties);
}

const FirestoreTextEditorContext = React.createContext<Context>({} as Context);

export default FirestoreTextEditorContext;
