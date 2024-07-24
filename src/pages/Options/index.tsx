import React from 'react';
import { createRoot } from 'react-dom/client';

import '../../assets/styles/tailwind.css';
import Options from './Options';

const container = document.getElementById('app-container');
const root = createRoot(container!);
root.render(<Options />);
