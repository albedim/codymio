
interface Notificationbadge{
  number: number,
  maxNumber: number,
  backgroundColor: string,
  color: string
}

const NotificationBadge: React.FC<Notificationbadge> = ({
  number,
  maxNumber,
  backgroundColor,
  color
}) => {
  return(
    number > 0 ? (
      <div style={{ marginTop: -14 }} className="absolute ml-4">
        <div 
          style={{ color: color, backgroundColor: backgroundColor }} 
          className="rounded-full pb-0 pt-0 p-1">
          <p
            className="text-sm rounded-full pb-0 pt-0 p-1 
            font-workSans"
            style={{ backgroundColor: backgroundColor, color: color }}>
              {number < maxNumber ? number : maxNumber + "+"}
          </p>
        </div>
      </div>
    ) : (
      <></>
    )
  )
}

export default NotificationBadge