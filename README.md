# Firestore Text Editor

Firestore Text Editor wraps [react-draft-wysiwyg](https://www.npmjs.com/package/react-draft-wysiwyg) and connects it to firestore.

## Getting Started

```
npm install --save firestore-text-editor react react-dom firebase
```

Firestore Text Editor depends on React, React DOM, and Firebase which must also be installed.

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

### FirestoreTextEditorProvider

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

## Props

The FirestoreTextEditor component can be configured with props

| Prop       | Type (\* = required)              | Default                   | Description                                                                                                                                                                                              |
| ---------- | --------------------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| path       | string\*                          |                           | Path to the document that will be written in Firestore                                                                                                                                                   |
| field      | string                            | "firestoreTextEditorData" | Field on the document in Firestore that will be written                                                                                                                                                  |
| isEditable | boolean                           | true                      | When true, an edit button will appear to change the editor into editing mode. Useful if not all users should be able to edit the data                                                                    |
| loader     | ReactElement                      | "Loading..."              | Override the loading component                                                                                                                                                                           |
| onSave     | (editorState: EditorState) => any |                           | Called whenever the editor is saved. Add some extra functionality here if you wish. The editorState passed in the params has the shape of [draft-js](https://www.npmjs.com/package/draft-js) EditorState |
