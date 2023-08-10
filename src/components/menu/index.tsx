import React, { useEffect, useState } from "react"

interface MenuProps {
  children: any[],
  maxHeight?: number,
  color: string,
  backgroundColor: string,
  visible: boolean,
}

const Menu: React.FC<MenuProps> = ({
  children,
  backgroundColor,
  color,
  visible,
  maxHeight
}) => {

  const [contextVisible, setContextVisible] = useState(visible)

  useEffect(() => {
    setContextVisible(visible)
  },[visible])

  return (
    <>
      {
        contextVisible ? (
          <div style={{ overflowY: "scroll", maxHeight: maxHeight ? maxHeight : "auto", backgroundColor: backgroundColor, color: color }} className="right-3 p-2 border rounded-md top-14 absolute" onClick={() => setContextVisible(false)}>
            {
              children.map((child, i) => (
                child
              ))
            }
          </div>
        ) : null
      }
    </>
  )

}

export default Menu