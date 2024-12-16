import Image from 'next/image'
import React from 'react'

interface EmptyProps {
    label: string;
  }

const Empty = ({
    label
  }: EmptyProps) => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
      <div className="relative h-[400px] w-[400px]">
        <Image src="/Designer-2.png" fill alt="Empty" />
      </div>
      <p className="text-muted-foreground text-sm text-center">
        {label}
      </p>
    </div>
  )
}

export default Empty