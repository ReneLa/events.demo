/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useLazyGetUserTicketsQuery, useLoginUserMutation } from '@/redux/user/auth.slice';
import cn from 'classnames';
import { useEffect, useState, useCallback } from 'react';
import styles from './form.module.css';
import { setFormStep } from '@/redux/ui/ui.slice';
import { useDispatch } from 'react-redux';
import LoadingDots from './loading-dots';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';


export default function LoginForm() {
  const [loginUser, {data, isLoading,isSuccess,isError, error}]= useLoginUserMutation()
  const [getUserTickets]=useLazyGetUserTicketsQuery()
  const [email, setEmail] = useState('wwa@gmail.com');
  const [password, setPassword] = useState('12345');
  const [focused, setFocused] = useState(false);
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
      if(isSuccess){
        router.replace('/dashboard')
      }
    
  },[isSuccess])

  useEffect(() => {
    if(isError && error){
      const message = error?.data.message
      console.log(error)
      toast.error(
        `Sorry, try again. ${message}`
      );
    }
},[error, isError])

   const onSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      var data = new FormData();
      data.append("email", email);
      data.append("password", password);
      await loginUser(data).unwrap()
    },
    [loginUser] 
  );
 
  return  (
          <div className='px-5 my-10'>
          <label
              htmlFor="email-input-field"
              className={cn(styles['input-label'], {
                [styles.focused]: focused
              })}
            >
              <input
                className={styles.input}
                autoComplete="off"
                type="email"
                id="email-input-field"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Enter email to register"
                aria-label="Your email address"
                required
              />
            </label>

            <label
              htmlFor="password-input-field"
              className={cn(styles['input-label'], {
                [styles.focused]: focused
              })}
            >
              <input
                className={styles.input}
                autoComplete="off"
                type="password"
                id="password-input-field"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Enter password"
                aria-label="Your password"
                required
              />
            </label>
            <div className='flex flex-ro items-center justify-center mt-5'>
            <button
              onClick={()=>dispatch(setFormStep(0))}
              className="w-1/3 h-10 mr-3 bg-[#131316] rounded-md border-2 border-solid border-[#702ec2] cursor-pointer text-base items-center justify-center inline-flex font-medium outline-none tracking-tight transition-colors duration-200 ease-in-out hover:bg-[#19191C]"
            >
             Back
          </button>
           <button  
             onClick={onSubmit}
             className='w-1/3 h-10  bg-[#702ec2] rounded-md border-2 border-solid border-[#702ec2] cursor-pointer text-base items-center justify-center inline-flex font-medium outline-none tracking-tight transition-colors duration-200 ease-in-out hover:bg-[#19191C]'
          >
           {isLoading ? <LoadingDots size={4} /> : <>Login</>}
        </button>
        </div>
        <Toaster
      position="top-right"
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