import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { IconButton, Tooltip } from '@material-ui/core';
import { Close, Create, Save } from '@material-ui/icons';
import FirestoreTextEditorContext from './FirestoreTextEditorContext';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

interface Props {
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

const FirestoreTextEditor: React.FC<Props> = ({
  path,
  field = 'firestoreTextEditorData',
  isEditable = true,
  loader,
  onSave,
  SaveButton,
  EditButton,
  CancelButton,
  saveButtonStyle,
  saveIconStyle,
  editButtonStyle,
  editIconStyle,
  cancelButtonStyle,
  cancelIconStyle,
  wrapperStyle,
  editorStyle,
  toolbarStyle,
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [lastSavedState, setLastSavedState] = useState(
    EditorState.createEmpty()
  );
  const [loadingData, setLoadingData] = useState(true);
  const [loadingSave, setLoadingSave] = useState(false);
  const [editing, setEditing] = useState(false);
  const {
    db,
    loader: contextLoader,
    SaveButton: ContextSaveButton,
    EditButton: ContextEditButton,
    CancelButton: ContextCancelButton,
    saveButtonStyle: contextSaveButtonStyle,
    saveIconStyle: contextSaveIconStyle,
    editButtonStyle: contextEditButtonStyle,
    editIconStyle: contextEditIconStyle,
    cancelButtonStyle: contextCancelButtonStyle,
    cancelIconStyle: contextCancelIconStyle,
    wrapperStyle: contextWrapperStyle,
    editorStyle: contextEditorStyle,
    toolbarStyle: contextToolbarStyle,
  } = useContext(FirestoreTextEditorContext);

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

  const handleSave = () => {
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
  };

  const handleEdit = () => setEditing(true);

  const handleCancel = () => {
    setEditorState(lastSavedState);
    setEditing(false);
  };

  return loadingData ? (
    loader ? (
      loader
    ) : contextLoader ? (
      contextLoader
    ) : (
      <>Loading...</>
    )
  ) : (
    <>
      {isEditable &&
        !editing &&
        (EditButton ? (
          <EditButton onClick={handleEdit} />
        ) : ContextEditButton ? (
          <ContextEditButton onClick={handleEdit} />
        ) : (
          <Tooltip title="Edit">
            <IconButton
              onClick={handleEdit}
              size="small"
              style={{ ...contextEditButtonStyle, ...editButtonStyle }}
            >
              <Create style={{ ...contextEditIconStyle, ...editIconStyle }} />
            </IconButton>
          </Tooltip>
        ))}

      {editing &&
        (SaveButton ? (
          <SaveButton disabled={loadingSave} onClick={handleSave} />
        ) : ContextSaveButton ? (
          <ContextSaveButton disabled={loadingSave} onClick={handleSave} />
        ) : (
          <Tooltip title="Save">
            <IconButton
              disabled={loadingSave}
              onClick={handleSave}
              size="small"
              style={{ ...contextSaveButtonStyle, ...saveButtonStyle }}
            >
              <Save style={{ ...contextSaveIconStyle, ...saveIconStyle }} />
            </IconButton>
          </Tooltip>
        ))}

      {editing &&
        (CancelButton ? (
          <CancelButton onClick={handleCancel} />
        ) : ContextCancelButton ? (
          <ContextCancelButton onClick={handleCancel} />
        ) : (
          <Tooltip title="Cancel">
            <IconButton
              onClick={handleCancel}
              size="small"
              style={{ ...contextCancelButtonStyle, ...cancelButtonStyle }}
            >
              <Close
                style={{ ...contextCancelIconStyle, ...cancelIconStyle }}
              />
            </IconButton>
          </Tooltip>
        ))}

      <Editor
        wrapperStyle={{
          ...(typeof contextWrapperStyle === 'function'
            ? contextWrapperStyle(editing)
            : contextWrapperStyle),
          ...(typeof wrapperStyle === 'function'
            ? wrapperStyle(editing)
            : wrapperStyle),
        }}
        editorStyle={
          editing
            ? {
                padding: 6,
                borderRadius: 2,
                border: '1px solid #F1F1F1',
                ...(typeof contextEditorStyle === 'function'
                  ? contextEditorStyle(editing)
                  : contextEditorStyle),
                ...(typeof editorStyle === 'function'
                  ? editorStyle(editing)
                  : editorStyle),
              }
            : {
                margin: '-1rem 0',
                ...(typeof contextEditorStyle === 'function'
                  ? contextEditorStyle(editing)
                  : contextEditorStyle),
                ...(typeof editorStyle === 'function'
                  ? editorStyle(editing)
                  : editorStyle),
              }
        }
        toolbarStyle={
          editing
            ? {
                ...(typeof contextToolbarStyle === 'function'
                  ? contextToolbarStyle(editing)
                  : contextToolbarStyle),
                ...(typeof toolbarStyle === 'function'
                  ? toolbarStyle(editing)
                  : toolbarStyle),
              }
            : {
                display: 'none',
                ...(typeof contextToolbarStyle === 'function'
                  ? contextToolbarStyle(editing)
                  : contextToolbarStyle),
                ...(typeof toolbarStyle === 'function'
                  ? toolbarStyle(editing)
                  : toolbarStyle),
              }
        }
        editorState={editorState}
        onEditorStateChange={setEditorState}
        readOnly={!editing}
      />
    </>
  );
};

export default FirestoreTextEditor;
