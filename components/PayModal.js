'use client'

import Image from 'next/image';
import React from 'react';
import PhoneInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';


const PayModal = ({phoneNumber, setPhoneNumber}) => {

  return (
    <div className="font-sans mt-10 ">
        <div className='flex flex-row w-full items-center justify-center mb-2'>
            <Image src='/momo_1.png' width={40} height={40} alt=' ' priority/>
          <p className="text-[20px] font-semibold my-0 ml-4 text-center">MoMo Payment</p>
        </div>
      <p className="text-gray-300 text-[15px] mb-4 text-center">
        Enter below you momo payment number
      </p>
      <div className='flex flex-col w-full'>
      <PhoneInput
      containerClassName="intl-tel-input"
      inputClassName="block w-full h-12 mt-2 border rounded-md focus:ring focus:ring-[#8465cb] focus:border-[#8465cb] bg-[#252729]"
      fieldId="phoneNumber"
      fieldName="phoneNumber"
      value={phoneNumber}
      defaultCountry='rw'
      onPhoneNumberChange={(status, value, countryData, number, id) =>{
        setPhoneNumber(value);
        // console.log(countryData);
      }
      }
    />
      </div>
    </div>
  );
};

export default PayModal;

