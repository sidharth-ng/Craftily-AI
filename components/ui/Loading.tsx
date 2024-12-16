import Image from 'next/image'
import React from 'react'

const Loading = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-20 h-20 relative animate-spin">
        <Image
          alt="Logo"
          src="/Designer.png"
          fill
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Craftify is thinking...
      </p>
    </div>
  )
}

export default Loading