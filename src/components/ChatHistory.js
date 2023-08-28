import React, { useEffect, useState } from 'react';
import './css/ChatHistory.css';
import { Box } from '@mui/system';
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { fetchHistory, setCurrentChatHistory } from '../redux/slice/chatSlice';
import ChatHistoryCard from './ChatHistoryCard';
import { AiOutlineLoading3Quarters } from "react-icons/ai"
export const ChatHistory = ({ handleClose }) => {

  const dispatch = useDispatch();
  const storeData = useSelector((state) => state);
  let [chatHistory, setChatHistory] = useState(undefined);
  let [isLoading, setIsLoading] = useState(undefined);

  useEffect(() => {
    dispatch(fetchHistory(storeData.profile.id))
  }, []);

  useEffect(() => {
    if (storeData.chatMsg?.chatHistory) {
      setChatHistory(storeData.chatMsg?.chatHistory)
    }
    if (storeData.chatMsg?.isHistoryLoading)
      setIsLoading(true)
    else setIsLoading(false)
  }, [storeData]);

  const handleCardClick = (item) => {
    dispatch(setCurrentChatHistory(item))
    handleClose();
  }

  return (
    <>
      <Box className='model-parent'>
      </Box>
      <Box className='modal-container'>
        <div className="title-div">
          <h5 className="title">Conversation History</h5>
          <IoClose onClick={handleClose} className="close-icon" />
        </div>

        {isLoading ? <AiOutlineLoading3Quarters /> :
          <ChatHistoryCard data={chatHistory || []} onClick={handleCardClick} />
        }
      </Box>
    </>
  )
};


export default ChatHistory;