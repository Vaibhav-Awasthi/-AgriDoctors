import React from "react";
import Container from "../container/Container";
import { useTranslation } from 'react-i18next';
const DiseaseResult = ({
  DiseasePic,
  DiseaseDesc,
  DiseaseDiagnosis,
  uploadAgainHanlder,
  error,
  SetDescription,
  setaccuracy
}) => {
  console.log(error);
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <>
        {error ? (
          <div className="py-4 text-lg font-semibold text-center">{error}</div>
        ) : (
          <>
           <div className="flex flex-col items-center justify-center gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
  <div className="flex flex-col items-center text-center">
    {/* <img src={DiseasePic} alt="Disease Illustration" className="w-48 h-48 object-cover mb-4 rounded-md" /> */}
    
    <div className="w-full max-w-md p-4 bg-gray-50 border border-gray-300 rounded-md shadow-sm">
      <p className="font-semibold text-lg mb-2">{t('Disease')}</p>
      <p className="text-gray-700">{DiseaseDiagnosis}</p>
    </div>

    <div className="w-full max-w-md p-4 bg-gray-50 border border-gray-300 rounded-md shadow-sm mt-4">
      <p className="font-semibold text-lg mb-2">{t('Disease Treatment')}</p>
      <p className="text-gray-700">{SetDescription}</p>
    </div>

    <div className="w-full max-w-md p-4 bg-gray-50 border border-gray-300 rounded-md shadow-sm mt-4">
      <p className="font-semibold text-lg mb-2">{t('Accuracy')}</p>
      <p className="text-gray-700">{setaccuracy}</p>
    </div>
  </div>
</div>

          </>
        )}
      </>
      <div className="flex justify-center">
        <button
          onClick={uploadAgainHanlder}
          className="bg-[var(--ternery-color)] px-4 py-2 font-semibold text-white rounded-md">
         {t('Upload Again')}
        </button>
      </div>
    </div>
  );
};

export default DiseaseResult;
