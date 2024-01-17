import React, { useEffect, useState } from "react";
import "./App.css";
import Router from './routes/Routes';

// import 'react-toastify/dist/ReactToastify.css';
// import i18n from 'i18next';
// import { I18nextProvider, initReactI18next } from 'react-i18next';
// import faTranslation from './locales/fa/translation.json';


// i18n.use(initReactI18next).init({
//   resources: {
//     fa: {
//       translation: faTranslation,
//     },
//     en: {
//       translation: faTranslation,
//     },
//   },
//   lng: 'fa', // Set the default language to Farsi
//   fallbackLng: 'fa', // Fallback language if a translation is missing
//   interpolation: {
//     escapeValue: false, // React handles escaping
//   },
// });

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }

        setDeferredPrompt(null);
      });
    }
  };

  return (
      <div>
        <button onClick={handleInstallClick}>Install App</button>
        <Router />
      </div>
  );
}

export default App;
