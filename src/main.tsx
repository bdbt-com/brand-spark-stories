import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initHaptics } from './lib/haptics'

initHaptics();

createRoot(document.getElementById("root")!).render(<App />);
