import React, { FC, useEffect } from 'react';
import Layout from './components/Layout';
import SunAsterisk from './components/SunAsterisk';
import { useParams } from 'react-router-dom';
import useUser from '../utilities/hooks/useUser';
import moment from 'moment';
import UserInformationLoading from './components/UserInformationLoading';
import {
  ArrowDownTrayIcon,
  CalendarIcon,
  EnvelopeIcon,
  HomeIcon,
  PhoneIcon,
  PrinterIcon,
} from '@heroicons/react/24/outline';

const UserInformation: FC = () => {
  const { id } = useParams();
  const { fetchUser, user, qrCode, isLoading, isError } = useUser();
  useEffect(() => {
    if (id) fetchUser(parseInt(id));
  }, [id]);
  const handleClickDownload = () => {
    const anchorElement = document.createElement('a');
    anchorElement.href =
      user?.attachments && user?.attachments.length > 1
        ? user?.attachments[1].url
        : '/images/qr-sample.png';
    anchorElement.download = 'QR_Code.jpeg';
    anchorElement.click();
    anchorElement.remove();
  };
  const handleClickPrint = () => {
    const popup = window.open(
      user?.attachments && user?.attachments.length > 1
        ? user?.attachments[1].url
        : '/images/qr-sample.png'
    );
    popup?.focus();
    popup?.print();
  };
  const avatarAttachments = user?.attachments?.filter(
    (attachment) => attachment.type === 'avatar'
  );

  return (
    <Layout>
      <main className='flex items-center flex-col w-full mx-auto max-w-5xl justify-center'>
        <SunAsterisk />
        <p className='text-gray-600 font-semibold text-3xl mt-3 mb-3'>
          User Info
        </p>
        <div className='flex flex-row w-full align border-1 mx-auto shadow-md bg-white rounded-lg'>
          {isLoading || isError ? (
            <UserInformationLoading />
          ) : (
            <>
              <div className='py-20 px-32 w-full max-w-lg mx-auto'>
                {avatarAttachments?.map((attachment) => (
                  <img
                    key={attachment.id}
                    className='h-52 w-52 mb-6 object-cover rounded shadow-md'
                    src={attachment.url}
                    alt='Profile Picture'
                  />
                ))}

                <div className='text-xl font-bold p-1.5'>{user?.name}</div>
                <div className='flex flex-row p-1.5'>
                  <HomeIcon className='w-6 h-6' />
                  <span className='pl-6'> {user?.address}</span>
                </div>
                <div className='flex flex-row p-1.5'>
                  <CalendarIcon className='w-6 h-6' />
                  <span className='pl-6'>
                    {moment(user?.birthdate).format('MMM DD, YYYY')}
                  </span>
                </div>
                <div className='text-xs font-semibold p-1.5'>
                  <span className='text-sun_asterisk'>CONTACT</span> INFORMATION
                </div>
                <div className='flex flex-row p-1.5'>
                  <EnvelopeIcon className='w-6 h-6' />
                  <span className='pl-6'>{user?.email}</span>
                </div>
                <div className='flex flex-row p-1.5'>
                  <PhoneIcon className='w-6 h-6' />
                  <span className='pl-6'>{user?.contact}</span>
                </div>
              </div>
              <div className='py-20 px-32 max-w-lg  mx-auto'>
                {user?.attachments && user.attachments.length > 1 ? (
                  <img
                    id='qr_code'
                    className='h-52 w-52 object-cover rounded shadow-md mb-6'
                    src={`${qrCode}`}
                    alt='QR code'
                  />
                ) : (
                  <img
                    id='qr_code'
                    src={'/images/qr-sample.png'}
                    className='h-52 w-52 object-cover rounded shadow-md mb-6'
                    alt='QR code'
                  />
                )}
                <button
                  onClick={handleClickDownload}
                  className='border-gray-700 border-2 hover:border-gray-500 rounded-md flex w-full items-center justify-center p-2 mt-6 text-sm space-x-2 '
                >
                  <ArrowDownTrayIcon className='w-5 h-5' />
                  <span className='text-gray-700'>Download QR Code</span>
                </button>
                <button
                  onClick={handleClickPrint}
                  className='bg-gray-700 border-2 text-white hover:border-gray-500 rounded-md flex w-full items-center justify-center p-2 mt-6 text-sm space-x-2 !'
                >
                  <PrinterIcon className='w-5 h-5' />
                  <span className='text-current'>Print QR Code</span>
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default UserInformation;
