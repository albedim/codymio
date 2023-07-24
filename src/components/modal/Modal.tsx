import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { RiCloseFill } from "react-icons/ri";
import "./Modal.css";
import axios from "axios";
import { MdBookmarkRemove, MdOutlineBookmark, MdOutlineFlightTakeoff } from "react-icons/md";
import { FaRegSadCry } from "react-icons/fa";
import { HiArrowCircleRight } from "react-icons/hi";



interface ContributeProps {
  onClose: () => void,
  visible: boolean,
  repo_id: number
}


const Contribute: React.FC<ContributeProps> = ({
  visible,
  onClose,
  repo_id
}) => {


  return (
    <>
      {
        visible ? (
          <div className="modal">
            <div className="modal-wrapper p-4">
              <div style={{ borderRadius: 8 }} className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="pb-0 p-4 items-center justify-between flex">
                  <div></div>
                  <div><RiCloseFill className="cursor-pointer" onClick={() => { onClose(); }} color="gray" size={24} /></div>
                </div>
                <div className="p-8 justify-around flex">
                  <div>
                  
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

export default Contribute;
