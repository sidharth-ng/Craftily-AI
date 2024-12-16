import React from 'react'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import Sidebar from './Sidebar'
import Mobilebar from './Mobilebar'

const Navbar = () => {
  return (
    <div className='flex item-centre p-4'>
       <Mobilebar/>
        <div className='flex w-full justify-end'>
            <UserButton afterSignOutUrl='/'/>

        </div>

    </div>
  )
}

export default Navbar