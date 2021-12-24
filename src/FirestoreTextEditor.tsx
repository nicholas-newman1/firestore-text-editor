import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { IconButton, Tooltip } from '@material-ui/core';
import { Close, Create, Save } from '@material-ui/icons';
import FirestoreTextEditorContext from './FirestoreTextEditorContext';

interface Props {
  path: string;
  field?: string;
  isEditable?: boolean;
  loader?: ReactElement;
  onSave?: (editorState: EditorState) => any;
}

const FirestoreTextEditor: React.FC<Props> = ({
  path,
  field = 'firestoreTextEditorData',
  isEditable = true,
  loader,
  onSave,
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [lastSavedState, setLastSavedState] = useState(
    EditorState.createEmpty()
  );
  const [loadingData, setLoadingData] = useState(true);
  const [loadingSave, setLoadingSave] = useState(false);
  const [editing, setEditing] = useState(false);
  const { db } = useContext(FirestoreTextEditorContext);

  useEffect(() => {
    db.doc(path)
      .get()
      .then(doc => {
        const data = doc.data();
        if (!data?.[field]) return setLoadingData(false);
        const state = EditorState.createWithContent(
          convertFromRaw(JSON.parse(data[field]))
        );
        setEditorState(state);
        setLastSavedState(state);
        setLoadingData(false);
      });
  }, []);

  return loadingData ? (
    loader ? (
      loader
    ) : (
      <>Loading...</>
    )
  ) : (
    <>
      {isEditable && !editing && (
        <Tooltip title="Edit">
          <IconButton onClick={() => setEditing(true)} size="small">
            <Create />
          </IconButton>
        </Tooltip>
      )}

      {editing && (
        <Tooltip title="Save">
          <IconButton
            disabled={loadingSave}
            onClick={() => {
              setLoadingSave(true);
              db.doc(path)
                .set(
                  {
                    [field]: JSON.stringify(
                      convertToRaw(editorState.getCurrentContent())
                    ),
                  },
                  { merge: true }
                )
                .then(() => {
                  setLoadingSave(false);
                  setLastSavedState(editorState);
                  setEditing(false);
                });
              onSave?.(editorState);
            }}
            size="small"
          >
            <Save />
          </IconButton>
        </Tooltip>
      )}

      {editing && (
        <Tooltip title="Cancel">
          <IconButton
            onClick={() => {
              setEditorState(lastSavedState);
              setEditing(false);
            }}
            size="small"
          >
            <Close />
          </IconButton>
        </Tooltip>
      )}

      <Editor
        editorStyle={
          editing
            ? {
                padding: 6,
                borderRadius: 2,
                border: '1px solid #F1F1F1',
              }
            : {}
        }
        toolbarStyle={editing ? {} : { display: 'none' }}
        editorState={editorState}
        onEditorStateChange={setEditorState}
        readOnly={!editing}
      />
    </>
  );
};

export default FirestoreTextEditor;
