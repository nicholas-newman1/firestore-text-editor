import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { EditorState } from 'draft-js';
import firebase from 'firebase/app';
import { ReactElement } from 'react';
export type FirebaseApp = firebase.app.App;

export interface FirestoreTextEditorProps {
  path: string;
  field?: string;
  isEditable?: boolean;
  loader?: ReactElement;
  onSave?: (editorState: EditorState) => any;
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
  wrapperStyle?: CSSProperties | ((editing: boolean) => CSSProperties);
  editorStyle?: CSSProperties | ((editing: boolean) => CSSProperties);
  toolbarStyle?: CSSProperties | ((editing: boolean) => CSSProperties);
}

export interface ProviderProps extends Partial<FirestoreTextEditorProps> {
  app: any;
}

export interface Context extends ProviderProps {
  app: FirebaseApp;
  db: firebase.firestore.Firestore;
}
