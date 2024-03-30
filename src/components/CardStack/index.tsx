import React, { ReactNode } from 'react'

type CardStackProps = {
  children?: ReactNode[] | ReactNode
  onClick?: () => void
}

const CardStack = ({ children, onClick }: CardStackProps) => {
  const hasChildren = Boolean(children)

  return (
    <div className="flex flex-col" onClick={onClick}>
      {!hasChildren && (
        <div className="border border-white rounded-lg h-full"></div>
      )}
      {children}
    </div>
  )
}

export default CardStack
