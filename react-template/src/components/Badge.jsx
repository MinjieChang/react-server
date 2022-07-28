import React from 'react'

const Badge = ({ color, size = 'default', ...rest }) => {
  const circle = size === 'large' ? 16 : size === 'small' ? 6 : 10
  return (
    <div
      style={{ backgroundColor: color, width: circle, height: circle, borderRadius: '50%' }}
      {...rest}
    ></div>
  )
}

export default Badge
