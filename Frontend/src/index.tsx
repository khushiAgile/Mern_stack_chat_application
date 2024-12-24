import { createRoot } from 'react-dom/client';

import AppContainer from './pages/App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<AppContainer />);
