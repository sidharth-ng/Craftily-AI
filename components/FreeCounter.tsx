import React, { useEffect, useState } from 'react'
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { MAX_FREE_COUNTS } from '@/constants';
import { Progress } from './ui/progress';
import { Zap } from 'lucide-react';
import { useProModal } from '@/hooks/use-pro-modal';

interface FreeCounterProps {
    apiLimitCount:number;
}

const FreeCounter = ({
    apiLimitCount=0
}: FreeCounterProps) => {
  const proModal=useProModal()
    const [mounted, setMounted] = useState(false)


    useEffect(() => {
     setMounted(true);
    }, [])

    if(!mounted){
      return null;
    }
    
  return (
    <div className='px-3 mt-4 '>
      <Card className='bg-white/10 border-0'>
        <CardContent className='py-6'>
        <div className='text-centre text-sm text-white mb-4 space-y-4'>
          <p>
            {apiLimitCount}/{MAX_FREE_COUNTS} Free Generations
          </p>
          <Progress 
           className='h-3'
           value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
          />
        </div>
        <Button onClick={proModal.onOpen} variant="premium" className="w-full">
          Upgrade
          <Zap className="w-4 h-4 ml-2 fill-white" />
        </Button>
       
        </CardContent>

      </Card>

    </div>
  )
}

export default FreeCounter