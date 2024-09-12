import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' }
];

const MultiLanguageSelector = () => {
  const { i18n } = useTranslation(); // Use the i18n instance to change languages
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language); // Initialize state with current language

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage); // Update state
    i18n.changeLanguage(newLanguage); // Change language in i18next
  };

  return (
    <div>
      <div>
        <select
          className="border border-gray-300 rounded-lg p-2"
          value={selectedLanguage} // Ensure the select box reflects the current language
          onChange={handleLanguageChange}
        >
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MultiLanguageSelector;
