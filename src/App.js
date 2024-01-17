import React from "react";
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
  return (
      <div>
        <Router />
      </div>
  );
}

export default App;
