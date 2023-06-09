import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ArrowDownTrayIcon, PrinterIcon } from '@heroicons/react/24/solid';

import '../assets/css/Registration.css';
import Layout from './components/Layout';
import SunAsterisk from './components/SunAsterisk';
import { axios } from '../utilities/axios/axios';
import { QrCode } from '../utilities/interfaces/QrCode';

const ThankYou: FC = () => {
  const [code, setCode] = useState<QrCode>();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`api/thank-you/${id}`).then((res) => {
      setCode(res.data.qrCodeDataUri);
    });
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    if (code) {
      link.href = code.toString();
      link.download = 'qrcode.svg';
      link.click();
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow?.document.write(
      '<html><head><title>QR Code</title></head><body>'
    );
    printWindow?.document.write(
      `<img src="${code}" style="width: 50%; height: 50%;" />`
    );
    printWindow?.document.close();
    printWindow?.print();
  };

  return (
    <Layout>
      <main className='w-full max-w-6xl m-auto px-5'>
        <div className='flex flex-col md:flex-row py-10 md:py-0 space-y-10 md:space-y-0 md:space-x-16 justify-center items-center'>
          <div className='flex flex-col text-left space-y-12'>
            <SunAsterisk />
            <div className='flex flex-col space-y-6'>
              <div className='flex flex-col'>
                <p className='text-6xl font-bold text-gray-700'>
                  Thank you for
                </p>
                <p className='text-6xl font-bold text-sun_asterisk'>
                  registering
                </p>
              </div>
              <div>
                <p className='text-lg leading-7 font-semibold text-gray-700'>
                  You may download or print the generated QR code.
                </p>
                <p className='text-sm leading-5 text-gray-700'>
                  Scan the QR. Click the link. View your profile.
                </p>
              </div>
            </div>
          </div>
          <div className='flex flex-col space-y-5 items-center w-full max-w-sm rounded-lg shadow-lg p-10  bg-white'>
            <img src={`${code}`} alt='Sample QR' className=' w-72 h-72' />
            <div className='flex flex-col space-y-2'>
              <button
                className='p-2 w-72 flex items-center justify-center space-x-2 text-xs font-semibold text-gray-700 bg-white border-4 border-gray-600 rounded-md hover:bg-gray-200 hover:border-gray-700'
                onClick={handleDownload}
              >
                <ArrowDownTrayIcon className='w-5 h-5' />
                <span>Download QR Code</span>
              </button>
              <button
                className='p-2 w-72 flex items-center justify-center space-x-2 text-xs bg-gray-700 border-4 border-gray-700 text-white rounded-md hover:bg-gray-600 hover:border-gray-600'
                onClick={handlePrint}
              >
                <PrinterIcon className='w-5 h-5' />
                <span>Print QR Code</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default ThankYou;
