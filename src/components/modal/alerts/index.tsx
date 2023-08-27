import React from "react";
import { RiCloseFill } from "react-icons/ri";
import '../index.css'
import { USED_COLORS } from "../../../App";


interface AlertsModalProps {
  onClose: () => void,
  visible: boolean,
  text: string
}

const AlertsModal: React.FC<AlertsModalProps> = ({
  visible,
  onClose,
  text
}) => {

  return (
    <>
      {
        visible ? (
          <div className="z-30 modal">
            <div className="modal-wrapper p-4">
              <div
                style={{
                  borderRadius: 8 
                }}
                className="bg-[#fafafa] border modal-content"
                onClick={e => e.stopPropagation()}
              >
                <div className="pb-0 p-4 items-center justify-between flex">
                  <div></div>
                  <div>
                    <RiCloseFill
                      className="cursor-pointer"
                      onClick={() => { onClose(); }}
                      color="gray"
                      size={24}
                    />
                  </div>
                </div>
                <div className="p-8 justify-around flex">
                  <div>
                    <div className="pb-4">
                      <h2 
                        className="text-[#475072] text-xl font-normal font-workSans">{text}
                      </h2>
                    </div>
                    <div className="pt-8">
                      <button 
                        style={{ color: "white", backgroundColor: "#7024f8" }} 
                        onClick={() => onClose()} 
                        className="font-normal font-workSans rounded-lg p-4">
                        GOT IT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )
      }
    </>
  );
};

export default AlertsModal;
