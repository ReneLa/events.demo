/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useLazyGetPayStatusQuery, useRegisterUserMutation } from '../redux/user/auth.slice';
import cn from 'classnames';
import { CheckCircle, Circle } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import PayModal from './PayModal';
import LoadingDots from './loading-dots';
import choiceStyles from './pay-choice-container.module.css';


export default function PayChoice({}) {
  const router = useRouter()
  const searchParams = useSearchParams();
  const user = searchParams.get('user');
  const [registerUser, {data, isSuccess,isError,error, isLoading}]= useRegisterUserMutation()
  const [getPayStatus, statusResult]= useLazyGetPayStatusQuery()
  const [pay_method, setPayMethod]= useState(1)
  const [phoneNumber, setPhoneNumber] = useState('');


  useEffect(() => {
    if(isSuccess){
      if(pay_method===2){
        window.location.href = data.url;
      }
      if(pay_method===1){
        toast.success(
          'Proceed to your phone and approve MoMo payment. To approve enter *182*1*7#'
        );
        // console.log(data)
        getPayStatus(data.data.payment_code)
      }
    }
},[isSuccess])

useEffect(()=>{
  if(statusResult.data){
    console.log('status',statusResult.data )
  }

},[statusResult])

useEffect(() => {
  if(isError && error){
    const message = error?.data.message
    console.log(error)
    toast.error(
      `${message}`
    );
  }
},[error, isError])


 const onSubmit = useCallback(
  async (e) => {
    e.preventDefault()
    const userData= JSON.parse(user)
    console.log(user, userData,phoneNumber)
    var data = new FormData();
    data.append("email", userData.email);
    data.append("password", userData.password);
    data.append("last_name", userData.last_name);
    data.append("first_name", userData.first_name);
    data.append("phone", phoneNumber);
    data.append("payment_type", JSON.stringify(pay_method));
    data.append("summit_id", userData.summit_id);
    data.append("total_amount",userData.total_amount);
    data.append("ticket_id",userData.ticket_id);
    data.append("address", userData.address);

    await registerUser(data).unwrap()
  },
  [registerUser,phoneNumber, pay_method] 
);


  return ( 
  <div className='relative flex flex-col w-full'>
    <button 
      className={cn(
       `w-full h-14 mt-4 bg-${pay_method === 1 ? '[#8465cb]' : '[#131316]'} rounded-md border-2 border-solid border-[#702ec2] cursor-pointer text-base items-center justify-center inline-flex font-medium outline-none tracking-tight transition-colors duration-200 ease-in-out hover:bg-[#19191C] `
      )}
      onClick={() => {
       setPayMethod(1)
      }}
    >
      <div className={choiceStyles.generateWithGithub}>
        <span className={choiceStyles.githubIcon}>
         <Image src='/momo.png' width={50} height={60} alt=' ' className='-top-10'/>
        </span>
         Pay with MoMo
      </div>
      <span className={choiceStyles.checkIcon}>
        {pay_method===1?
        <CheckCircle color="#fff" size={24} />:
        <Circle color="#fff" size={24} />}
      </span>
    </button>

    <button
       onClick={() => {
        setPayMethod(2)
      }}
      className={cn(
        `w-full h-14 mt-4 bg-${pay_method === 2 ? '[#8465cb]' : '[#131316]'} rounded-md border-2 border-solid border-[#702ec2] cursor-pointer text-base items-center justify-center inline-flex font-medium outline-none tracking-tight transition-colors duration-200 ease-in-out hover:bg-[#19191C] `
      )}
     
    >
      <div className={choiceStyles.generateWithGithub}>
        <span className={choiceStyles.githubIcon}>
         <Image src='/visa_card.png' width={50} height={70} alt=' '/>
        </span>
         Pay with Visa Card
      </div>
      <span className={choiceStyles.checkIcon}>
      {pay_method===2?
        <CheckCircle color="#fff" size={24} />:
        <Circle color="#fff" size={24} />}
      </span>
    </button>

    {pay_method===1 && <PayModal phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}/>}

    <div className='flex flex-row items-center justify-evenly mt-10'>
    <button
        onClick={()=>router.back()}
         className={cn(
          `w-1/3 h-12 mr-2 bg-[#131316] rounded-md border-2 border-solid border-[#702ec2] cursor-pointer text-base items-center justify-center inline-flex font-medium outline-none tracking-tight transition-colors duration-200 ease-in-out hover:bg-[#19191C]`
        )}
        >
          Back
    </button>
    <button
      onClick={onSubmit}
      className={cn(
          `w-1/3 h-12  bg-[#702ec2] rounded-md border-2 border-solid border-[#702ec2] cursor-pointer text-base items-center justify-center inline-flex font-medium outline-none tracking-tight transition-colors duration-200 ease-in-out hover:bg-[#19191C]`
        )}
        >
          {isLoading ? <LoadingDots size={4} /> : <>Proceed</>} 
        </button>
    </div>
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: 'var(--accents-7)',
          color: 'var(--accents-1)'
        }
      }}
    />
  </div>
  );
}


