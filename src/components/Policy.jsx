import React from 'react';
import { useTranslation } from 'react-i18next';
import withDirection from './withDirection';

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto p-4 text-justify">
      <h1 className="text-2xl font-bold mb-4">{t('privacyPolicy.title')}</h1>
      <p className="mb-4">{t('privacyPolicy.intro')}</p>

      <h2 className="text-xl font-semibold mb-2">{t('privacyPolicy.section1.title')}</h2>
      <p className="mb-4">
        {t('privacyPolicy.section1.description')}
        <ul className="list-disc list-inside">
          <li>{t('privacyPolicy.section1.items.phoneNumber')}</li>
          <li>{t('privacyPolicy.section1.items.nationalId')}</li>
          <li>{t('privacyPolicy.section1.items.personalInfo')}</li>
          <li>{t('privacyPolicy.section1.items.address')}</li>
          <li>{t('privacyPolicy.section1.items.email')}</li>
          <li>{t('privacyPolicy.section1.items.locationInfo')}</li>
          <li>{t('privacyPolicy.section1.items.deviceInfo')}</li>
          <li>{t('privacyPolicy.section1.items.usageInfo')}</li>
          <li>{t('privacyPolicy.section1.items.financialInfo')}</li>
          <li>{t('privacyPolicy.section1.items.authInfo')}</li>
          <li>{t('privacyPolicy.section1.items.contacts')}</li>
          <li>{t('privacyPolicy.section1.items.smsCallData')}</li>
          <li>{t('privacyPolicy.section1.items.microphoneCamera')}</li>
        </ul>
      </p>

      <h2 className="text-xl font-semibold mb-2">{t('privacyPolicy.section2.title')}</h2>
      <p className="mb-4">
        {t('privacyPolicy.section2.description')}
        <ul className="list-disc list-inside">
          <li>{t('privacyPolicy.section2.items.betterServices')}</li>
          <li>{t('privacyPolicy.section2.items.communication')}</li>
          <li>{t('privacyPolicy.section2.items.personalization')}</li>
          <li>{t('privacyPolicy.section2.items.performanceAnalysis')}</li>
          <li>{t('privacyPolicy.section2.items.lawCompliance')}</li>
          <li>{t('privacyPolicy.section2.items.paymentProcessing')}</li>
          <li>{t('privacyPolicy.section2.items.advertising')}</li>
        </ul>
      </p>

      <h2 className="text-xl font-semibold mb-2">{t('privacyPolicy.section3.title')}</h2>
      <p className="mb-4">{t('privacyPolicy.section3.description')}</p>

      <h2 className="text-xl font-semibold mb-2">{t('privacyPolicy.section4.title')}</h2>
      <p className="mb-4">
        {t('privacyPolicy.section4.description')}
        <ul className="list-disc list-inside">
          <li>{t('privacyPolicy.section4.items.withConsent')}</li>
          <li>{t('privacyPolicy.section4.items.legalObligations')}</li>
          <li>{t('privacyPolicy.section4.items.subsidiaries')}</li>
          <li>{t('privacyPolicy.section4.items.businessPartners')}</li>
        </ul>
      </p>

      <h2 className="text-xl font-semibold mb-2">{t('privacyPolicy.section5.title')}</h2>
      <p className="mb-4">{t('privacyPolicy.section5.description')}</p>

      <h2 className="text-xl font-semibold mb-2">{t('privacyPolicy.section6.title')}</h2>
      <p className="mb-4">{t('privacyPolicy.section6.description')}</p>

      <h2 className="text-xl font-semibold mb-2">{t('privacyPolicy.section7.title')}</h2>
      <p className="mb-4">{t('privacyPolicy.section7.description')}</p>

      <h2 className="text-xl font-semibold mb-2">{t('privacyPolicy.section8.title')}</h2>
      <p className="mb-4">{t('privacyPolicy.section8.description')}</p>

      <h2 className="text-xl font-semibold mb-2">{t('privacyPolicy.section9.title')}</h2>
      <p className="mb-4">{t('privacyPolicy.section9.description')}</p>

      <h2 className="text-xl font-semibold mb-2">{t('privacyPolicy.section10.title')}</h2>
      <p className="mb-4">{t('privacyPolicy.section10.description')}</p>

      <h2 className="text-xl font-semibold mb-2">{t('privacyPolicy.section11.title')}</h2>
      <p className="mb-4">{t('privacyPolicy.section11.description')}</p>

      <h2 className="text-xl font-semibold mb-2">{t('privacyPolicy.section12.title')}</h2>
      <p className="mb-4">{t('privacyPolicy.section12.description')}</p>

      <h2 className="text-xl font-semibold mb-2">{t('privacyPolicy.contact.title')}</h2>
      <p className="mb-4">
        {t('privacyPolicy.contact.description')}
        <ul className="list-disc list-inside">
          <li>{t('privacyPolicy.contact.email')}</li>
          <li>{t('privacyPolicy.contact.phone')}</li>
        </ul>
      </p>
    </div>
  );
}

export default withDirection(PrivacyPolicy);
