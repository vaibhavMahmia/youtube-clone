import React from 'react'

export const Spinner: React.FC = () => {
  return (
    <div className="flex items-center w-full justify-center py-3">
      <div className="w-32 h-32 border-8 border-[#ffffff80] border-solid rounded-full animate-spin border-t-transparent backdrop-blur-md"></div>
    </div>
  )
}
