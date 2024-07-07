import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const withDirection = (WrappedComponent) => {
  return (props) => {
    const { i18n } = useTranslation();
    const lang = i18n.language;

    useEffect(() => {
      const direction = lang === 'fa' ? 'rtl' : 'ltr';
      document.documentElement.setAttribute('dir', direction);
      document.documentElement.setAttribute('lang', lang);
    }, [lang]);

    return <WrappedComponent {...props} />;
  };
};

export default withDirection;
