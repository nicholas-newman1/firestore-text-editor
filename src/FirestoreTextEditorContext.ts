import React from 'react';
import { Context } from './types';
const FirestoreTextEditorContext = React.createContext<Context>({} as Context);
export default FirestoreTextEditorContext;
