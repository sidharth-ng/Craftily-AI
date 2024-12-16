import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/navbar';
import { getApiLimitCount } from '@/lib/api-limit';
import React from 'react'

const DashboardLayout = async({
    children
}:{
    children:React.ReactNode;
}) => {

  const apiLimitCount=await getApiLimitCount();


  return (
    <div className='h-full relativr'>
        <div className='hidden h-full md:flex md:w-72 md:flex-col md:fixed md:insert-y-0  bg-gray-900'>
          <div>
        <Sidebar apiLimitCount={apiLimitCount}/>
          </div>
        </div>
        <main className='md:pl-72'>
          <Navbar/>
          {children }
        </main>
    </div>
  )
}

export default DashboardLayout