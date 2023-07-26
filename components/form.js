"use client";

import * as Tabs from '@radix-ui/react-tabs';
import cn from 'classnames';
import { motion } from 'framer-motion';
import styles from './form.module.css';
import LoginForm from './login-form';
import RegisterForm from './register-form';


export default function Form() {

  return  (
    <motion.form
      method='post'
      className={cn(styles.form)}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}

    >
     <Tabs.Root asChild defaultValue="1" className='w-full md:w-1/2'>
      <div className="w-full md:w-1/2">
        <Tabs.List className="w-full px-4 tabs">
          <Tabs.Trigger asChild value="1">
            <button className="w-1/2 text-gray-300 h-[35px] text-[14px] border-solid border border-gray-700 rounded-l-md">
              Login
            </button>
          </Tabs.Trigger>
            <Tabs.Trigger asChild value="2">
              <button className="w-1/2  text-gray-300 h-[35px] text-[14px] border-solid border border-gray-700 rounded-r-md">
                Register
              </button>
            </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content asChild value="1" className='w-full'>
          <LoginForm />
        </Tabs.Content>
        <Tabs.Content asChild value="2">
          <RegisterForm />
        </Tabs.Content>
      </div>
    </Tabs.Root>
    </motion.form>
  );
}