import {
  FirestoreTextEditor,
  FirestoreTextEditorProvider,
} from 'firestore-text-editor';
import { app } from './services/firebase';

function App() {
  return (
    <FirestoreTextEditorProvider app={app}>
      <FirestoreTextEditor path="pages/about" />
    </FirestoreTextEditorProvider>
  );
}

export default App;
