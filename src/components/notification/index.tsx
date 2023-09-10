import { BsCalendar2Date } from "react-icons/bs"
import { MdOutlineDone } from "react-icons/md"
import { BASE_URL } from "../../utils/utils"
import axios from "axios"

interface NotificationProps{
  notification: NotificationType,
  onRemove: (res: NotificationType[]) => void
}

export interface NotificationType {
  content: string,
  global_notification: boolean,
  notification_id: number,
  title: string,
  created_on: string,
  removable: boolean,
  user_id: number
}

const Notification: React.FC<NotificationProps> = ({
  notification,
  onRemove
}) => {

  const removeNotification = async (notificationId: number) => {
    await axios.delete(BASE_URL + "/notifications/" + notificationId.toString())
      .then((res) => onRemove(res.data.param))
      .catch(err => { })
  }

  const getDate = (date: string) => {
    const newDate = new Date(parseInt(date.split("-")[0]), parseInt(date.split("-")[1]), parseInt(date.split("-")[2]))
    const days = new Date().getDate() - newDate.getDate()
    if(days == 0)
      return "Today"
    if(days > 0 && days < 7){
      if (days == 1)
        return days + " day ago"
      return days + " days ago"
    }
    return date.replaceAll("-", "/")
  }

  return (
    <div className="pb-2 pt-4 border-b items-center justify-between flex">
      <div>
        <div className="items-center flex">
          <h2 className="text-md font-semibold font-lato">{notification.title}</h2>
          <p className="pr-2 pl-2">•</p>
          <p className="text-sm font-normal text-[gray] font-lato">  {getDate(notification.created_on).toString()}</p>
        </div>
        <p className="text-md font-lato">{
          notification.content.split("/")[1] != undefined &&
          notification.content.split("/")[1].length +
          notification.content.split("/")[0].split(" ")[1].length > 21 ?
          notification.content.substring(0, 54) + "..." : notification.content
        }</p>
      </div>
      <div className="pl-4">
        {
          notification.removable ? (
            <div className="p-1 border rounded-full">
              <MdOutlineDone
                className="cursor-pointer"
                color="#7024f8"
                size={18}
                onClick={() => removeNotification(notification.notification_id)}
              />
            </div>
          ):(
            null
          )
        }
      </div>
    </div >
  )
}

export default Notification