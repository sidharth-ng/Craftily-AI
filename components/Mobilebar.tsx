import React from 'react'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import { SheetContent,Sheet, SheetTrigger } from './ui/sheet'
import Sidebar from './Sidebar'

const Mobilebar = () => {
  return (
    <Sheet>
        <SheetTrigger>
    <Button variant='ghost' size='icon'
    className='md:hidden'>
        <Menu/>
    </Button>
    </SheetTrigger >
    <SheetContent side='left' className='p-0'>
        <Sidebar/>

    </SheetContent>
    </Sheet>
  )
}

export default Mobilebar