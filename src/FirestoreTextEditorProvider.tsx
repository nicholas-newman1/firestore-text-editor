import React, { CSSProperties, ReactElement } from 'react';
import FirestoreTextEditor from './FirestoreTextEditorContext';
import { FirebaseApp } from './types';

interface Props {
  app: any;
  loader?: ReactElement;
  SaveButton?: (props: {
    onClick: () => any;
    disabled?: boolean;
  }) => ReactElement;
  EditButton?: (props: { onClick: () => any }) => ReactElement;
  CancelButton?: (props: { onClick: () => any }) => ReactElement;
  saveButtonStyle?: CSSProperties;
  saveIconStyle?: CSSProperties;
  editButtonStyle?: CSSProperties;
  editIconStyle?: CSSProperties;
  cancelButtonStyle?: CSSProperties;
  cancelIconStyle?: CSSProperties;
}

const FirestoreTextEditorProvider: React.FC<Props> = ({
  app,
  loader,
  children,
  SaveButton,
  EditButton,
  CancelButton,
  saveButtonStyle,
  saveIconStyle,
  editButtonStyle,
  editIconStyle,
  cancelButtonStyle,
  cancelIconStyle,
}) => {
  const db = (app as FirebaseApp).firestore();

  return (
    <FirestoreTextEditor.Provider
      value={{
        app,
        db,
        loader,
        SaveButton,
        EditButton,
        CancelButton,
        saveButtonStyle,
        saveIconStyle,
        editButtonStyle,
        editIconStyle,
        cancelButtonStyle,
        cancelIconStyle,
      }}
    >
      {children}
    </FirestoreTextEditor.Provider>
  );
};

export default FirestoreTextEditorProvider;
