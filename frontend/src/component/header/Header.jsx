import React from "react";
import Container from "../container/Container";
import MultiLanguageSelector from "../multilanguageselector/MultiLanguageSelector";
import { useTranslation } from 'react-i18next';
const Header = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-[var(--ternery-color)]">
      <Container>
        <div className="flex md:flex-row items-center justify-center flex-col">
          <h1 className="font-bold text-white text-2xl p-4">
            {t('AI-Powered Disease Diagnosis')}
          </h1>
          <MultiLanguageSelector />
        </div>
      </Container>
    </div>
  );
};

export default Header;
