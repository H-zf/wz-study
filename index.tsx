import React from 'react';
import './index.css';
import AppComponent from './route'
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container as Element);
root.render(<AppComponent />);
