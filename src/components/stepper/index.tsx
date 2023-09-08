import { useState } from "react"
import { AiFillClockCircle } from "react-icons/ai"
import { BsFillSignMergeLeftFill } from "react-icons/bs"
import { PiPushPinFill } from "react-icons/pi"
import AlertsModal from "../modal/alerts"
import { LABELS } from "../../utils/labels"
import { CSSTransition } from "react-transition-group"

interface StepperProps {
  status: "none" | "pushed" | "completed"
}

interface StepProps {
  status: "none" | "pushed" | "completed",
  onClick?: () => void
}


const Stepper: React.FC<StepperProps> = ({
  status
}) => {

  const [modalOptions, setModalOptions] = useState({ text: "", visible: false })

  return (
    <div>
      <AlertsModal 
        onClose={() => setModalOptions({ text: "", visible: false })} 
        visible={modalOptions.visible} 
        text={modalOptions.text} 
      />
      <PushedStep status={status} />
      <WaitingStep 
        onClick={() => setModalOptions({ text: LABELS.stepper.pushed, visible: true })} 
        status={status} 
      />
      <FinalStep 
        onClick={() => setModalOptions({ text: LABELS.stepper.completed, visible: true })} 
        status={status} 
      />
    </div>
  )
}

const PushedStep: React.FC<StepProps> = ({
  status,
}) => {

  return (
    <div>
      {
        status == "none" ? (
          <>
            <div className="items-center flex">
              <div className="pr-2"><PiPushPinFill color="darkgray" /></div>
              <p className="text-[darkgray] font-workSans">Pushed</p>
            </div>
            <div className="pb-0 pt-0 p-2">
              <div style={{ backgroundColor: 'darkgray', width: 2, height: 12.4 }} ></div>
            </div>
          </>
        ) : (
          <>
            <div className="opacity-60 items-center flex">
              <div className="pr-2"><PiPushPinFill color="darkgray" /></div>
              <p className="text-[darkgray] font-workSans">Pushed</p>
            </div>
            <div className="opacity-60 pb-0 pt-0 p-2">
              <div style={{ backgroundColor: 'darkgray', width: 2, height: 8 }} ></div>
            </div>
          </>
        )
      }
    </div>
  )
}

const WaitingStep: React.FC<StepProps> = ({
  status,
  onClick
}) => {

  return (
    <div>
      {
        status == "none" ? (
          <>
            <div className="items-center flex">
              <div className="pr-2"><AiFillClockCircle color="darkgray" /></div>
              <p className="text-[darkgray] font-workSans">Waiting</p>
            </div>
            <div className="pb-0 pt-0 p-2">
              <div style={{ backgroundColor: 'darkgray', width: 2, height: 12.4 }} ></div>
            </div>
          </>
        ) : (
          status == "pushed" ? (
            <>
              <div onClick={onClick} className="cursor-pointer items-center flex">
                <div className="pr-2"><AiFillClockCircle color="orange" /></div>
                <p className="font-semibold text-[orange] font-workSans">Waiting</p>
              </div>
              <div className="pb-0 pt-0 p-2">
                <div style={{ borderRadius: 40, backgroundColor: 'darkgray', width: 2, height: 12.4 }} ></div>
              </div>
            </>
          ) : (
            <>
              <div className="opacity-60 items-center flex">
                <div className="pr-2"><AiFillClockCircle color="darkgray" /></div>
                <p className="text-[darkgray] font-workSans">Waiting</p>
              </div>
              <div className="opacity-60 pb-0 pt-0 p-2">
                <div style={{ backgroundColor: 'darkgray', width: 2, height: 8 }} ></div>
              </div>
            </>
          )
        )
      }
    </div >
  )
}

const FinalStep: React.FC<StepProps> = ({
  status,
  onClick
}) => {

  return (
    <div>
      {
        status == "none" || status == "pushed" ? (
          <div className="items-center flex">
            <div className="pr-2"><BsFillSignMergeLeftFill color="darkgray" /></div>
            <p className="text-[darkgray] font-workSans">Completed</p>
          </div>
        ) : (
          status == "completed" ? (
            <div onClick={onClick} className="cursor-pointer items-center flex">
              <div className="pr-2"><BsFillSignMergeLeftFill color="#4a9e4c" /></div>
              <p className="font-semibold text-[#4a9e4c] font-workSans">Completed</p>
            </div>
          ) : null
        )
      }
    </div>
  )
}

export default Stepper

