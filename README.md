# Firestore Text Editor

![example](https://media3.giphy.com/media/6oK9D9POcoG2l1H30x/giphy.gif?cid=790b7611abc025bbc17f0ed96674aed349e8adeec9c9f9c0&rid=giphy.gif&ct=g)

Firestore Text Editor wraps [react-draft-wysiwyg](https://www.npmjs.com/package/react-draft-wysiwyg) and connects it to firestore.

## Table of contents

1. [Getting Started](#gettingstarted)
   1. [Using Firestore Text Editor](#usingfirestoretexteditor)
2. [FirestoreTextEditorProvider](#firestoretexteditorprovider2)
   1. [FirestoreTextEditorProvider Props](#firestoretexteditorproviderprops)
   2. [Example - Replacing Edit Button App Wide](#firestoretexteditorproviderpropsexample)
3. [FirestoreTextEditor Props](#firestoretexteditorprops)
   1. [Example - Overriding Provider](#firestoretexteditorpropsexample)

<a name="gettingstarted"></a>

## Getting Started

```
npm install --save firestore-text-editor react react-dom firebase
```

Firestore Text Editor depends on React, React DOM, and Firebase which must also be installed.

<a name="usingfirestoretexteditor"></a>

### Using Firestore Text Editor

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import {
  FirestoreTextEditor,
  FirestoreTextEditorProvider,
} from 'firestore-text-editor';
import firebase from 'firebase/app';
import 'firebase/firestore';

let config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = firebase.initializeApp(config);

function App() {
  return (
    <FirestoreTextEditorProvider app={app}>
      <FirestoreTextEditor path="pages/about" />
    </FirestoreTextEditorProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

<a name="firestoretexteditorprovider2"></a>

## FirestoreTextEditorProvider

Firestore Text Editor uses a provider that takes in a prop "app", an instance of FirebaseApp. Through React's context API, anywhere the FirestoreTextEditor component is used, it has access to the FirebaseApp and can make database calls.

```javascript
import {
  FirestoreTextEditor,
  FirestoreTextEditorProvider,
} from 'firestore-text-editor';

function App() {
  return (
    <FirestoreTextEditorProvider app={app}>
      <FirestoreTextEditor path="pages/about" />
    </FirestoreTextEditorProvider>
  );
}
```

<a name="firestoretexteditorproviderprops"></a>

### FirestoreTextEditorProvider Props

| Prop              | Type (\* = required)                                          | Default                   | Description                                                                                                                           |
| ----------------- | ------------------------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| app               | FirebaseApp\*                                                 |                           | An instance of FirebaseApp                                                                                                            |
| field             | string                                                        | "firestoreTextEditorData" | Field on the document in Firestore that will be written                                                                               |
| isEditable        | boolean                                                       | true                      | When true, an edit button will appear to change the editor into editing mode. Useful if not all users should be able to edit the data |
| loader            | ReactElement                                                  | "Loading..."              | Override the loading component                                                                                                        |
| SaveButton        | FunctionComponent<{ onClick: () => any; disabled?: boolean }> |                           | Replace the save button with a different component                                                                                    |
| EditButton        | FunctionComponent<{ onClick: () => any }>                     |                           | Replace the edit button with a different component                                                                                    |
| CancelButton      | FunctionComponent<{ onClick: () => any }>                     |                           | Replace the cancel button with a different component                                                                                  |
| saveButtonStyle   | CSSProperties                                                 |                           | Override the save button styles                                                                                                       |
| saveIconStyle     | CSSProperties                                                 |                           | Override the save icon styles                                                                                                         |
| editButtonStyle   | CSSProperties                                                 |                           | Override the edit button styles                                                                                                       |
| editIconStyle     | CSSProperties                                                 |                           | Override the edit icon styles                                                                                                         |
| cancelButtonStyle | CSSProperties                                                 |                           | Override the cancel button styles                                                                                                     |
| cancelIconStyle   | CSSProperties                                                 |                           | Override the cancel icon styles                                                                                                       |
| wrapperStyle      | CSSProperties OR (editing: boolean) => CSSProperties          |                           | Override the wrapper styles (from react-draft-wysiwyg)                                                                                |
| editorStyle       | CSSProperties OR (editing: boolean) => CSSProperties          |                           | Override the editor styles (from react-draft-wysiwyg)                                                                                 |
| toolbarStyle      | CSSProperties OR (editing: boolean) => CSSProperties          |                           | Override the toolbar styles (from react-draft-wysiwyg)                                                                                |

<a name="firestoretexteditorproviderpropsexample"></a>

### Example - Replacing Edit Button App Wide

```js
import {
  FirestoreTextEditor,
  FirestoreTextEditorProvider,
} from 'firestore-text-editor';
import { app } from './services/firebase';

function App() {
  return (
    <FirestoreTextEditorProvider
      app={app}
      EditButton={props => <button {...props}>Edit</button>}
    >
      {/* Both editors will have new edit button */}
      <FirestoreTextEditor path="pages/about" />
      <FirestoreTextEditor path="pages/faq" />
    </FirestoreTextEditorProvider>
  );
}

export default App;
```

<a name="firestoretexteditorprops"></a>

## FirestoreTextEditor Props

The FirestoreTextEditor component can be configured with props. Any shared props with the provider will be overridden.

| Prop              | Type (\* = required)                                          | Default                   | Description                                                                                                                                                                                              |
| ----------------- | ------------------------------------------------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| path              | string\*                                                      |                           | Path to the document that will be written in Firestore                                                                                                                                                   |
| field             | string                                                        | "firestoreTextEditorData" | Field on the document in Firestore that will be written                                                                                                                                                  |
| isEditable        | boolean                                                       | true                      | When true, an edit button will appear to change the editor into editing mode. Useful if not all users should be able to edit the data                                                                    |
| loader            | ReactElement                                                  | "Loading..."              | Override the loading component                                                                                                                                                                           |
| onSave            | (editorState: EditorState) => any                             |                           | Called whenever the editor is saved. Add some extra functionality here if you wish. The editorState passed in the params has the shape of [draft-js](https://www.npmjs.com/package/draft-js) EditorState |
| SaveButton        | FunctionComponent<{ onClick: () => any; disabled?: boolean }> |                           | Replace the save button with a different component                                                                                                                                                       |
| EditButton        | FunctionComponent<{ onClick: () => any }>                     |                           | Replace the edit button with a different component                                                                                                                                                       |
| CancelButton      | FunctionComponent<{ onClick: () => any }>                     |                           | Replace the cancel button with a different component                                                                                                                                                     |
| saveButtonStyle   | CSSProperties                                                 |                           | Override the save button styles                                                                                                                                                                          |
| saveIconStyle     | CSSProperties                                                 |                           | Override the save icon styles                                                                                                                                                                            |
| editButtonStyle   | CSSProperties                                                 |                           | Override the edit button styles                                                                                                                                                                          |
| editIconStyle     | CSSProperties                                                 |                           | Override the edit icon styles                                                                                                                                                                            |
| cancelButtonStyle | CSSProperties                                                 |                           | Override the cancel button styles                                                                                                                                                                        |
| cancelIconStyle   | CSSProperties                                                 |                           | Override the cancel icon styles                                                                                                                                                                          |
| wrapperStyle      | CSSProperties OR (editing: boolean) => CSSProperties          |                           | Override the wrapper styles (from react-draft-wysiwyg)                                                                                                                                                   |
| editorStyle       | CSSProperties OR (editing: boolean) => CSSProperties          |                           | Override the editor styles (from react-draft-wysiwyg)                                                                                                                                                    |
| toolbarStyle      | CSSProperties OR (editing: boolean) => CSSProperties          |                           | Override the toolbar styles (from react-draft-wysiwyg)                                                                                                                                                   |

<a name="firestoretexteditorpropsexample"></a>

### Example - Overriding Provider

```js
import {
  FirestoreTextEditor,
  FirestoreTextEditorProvider,
} from 'firestore-text-editor';
import { app } from './services/firebase';

function App() {
  return (
    <FirestoreTextEditorProvider
      app={app}
      SaveButton={props => <button {...props}>Save1</button>}
    >
      {/* This editor will have Save1 button from provider */}
      <FirestoreTextEditor path="pages/about" />

      {/* This editor will have Save2 button from prop */}
      <FirestoreTextEditor
        SaveButton={props => <button {...props}>Save2</button>}
        path="pages/faq"
      />
    </FirestoreTextEditorProvider>
  );
}

export default App;
```
