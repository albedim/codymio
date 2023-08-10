import React, {
  useEffect,
  useState
} from "react";
import { RiCloseFill } from "react-icons/ri";
import axios from "axios";
import '../index.css'
import {
  HiArrowCircleLeft,
  HiArrowCircleRight
} from "react-icons/hi";
import { BASE_URL } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Loader from "../../loading";
import NoResults from "../../no_results";
import { TbAlertTriangleFilled } from "react-icons/tb";
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
          <div className="modal">
            <div className="modal-wrapper p-4">
              <div
                style={{ borderColor: USED_COLORS[3], backgroundColor: USED_COLORS[0], borderRadius: 8 }}
                className="border modal-content"
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
                      <h2 style={{ color: USED_COLORS[1] }} className="text-xl font-normal font-workSans">{text}</h2>
                    </div>
                    <div className="pt-8">
                      <button style={{ color: USED_COLORS[0], backgroundColor: USED_COLORS[1] }} onClick={() => onClose()} className="font-normal font-workSans rounded-lg p-4">
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