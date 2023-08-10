import React, { useEffect, useState } from "react"

interface MenuProps {
  children: any[] | any,
  maxHeight?: number,
  maxWidth?: number,
  width?: number,
  height?: number,
  color: string,
  backgroundColor: string,
  visible: boolean,
}

const Menu: React.FC<MenuProps> = ({
  children,
  backgroundColor,
  color,
  visible,
  maxHeight,
  maxWidth,
  height,
  width
}) => {

  const [contextVisible, setContextVisible] = useState(visible)

  useEffect(() => {
    setContextVisible(visible)
  },[visible])

  return (
    <>
      {
        contextVisible ? (
          <div style={{ 
            height: height ? height : "auto", 
            width: width ? width : "auto", 
            maxWidth: maxWidth ? maxWidth : "auto", 
            overflowY: "scroll",
            overflowX: 'hidden',
            maxHeight: maxHeight ? maxHeight : "auto", 
            backgroundColor: 
            backgroundColor, color: color 
          }} 
          className="right-3 p-2 border rounded-md top-14 absolute" 
          onClick={() => setContextVisible(false)}>
            {
              Array.isArray(children) ? (
                children.map((child, i) => (
                  child
                ))
              ):(
                children
              )
            }
          </div>
        ) : null
      }
    </>
  )

}

export default Menu