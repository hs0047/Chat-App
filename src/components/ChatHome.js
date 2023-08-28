import { GrAdd } from "react-icons/gr";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineHistory, AiOutlineSend } from "react-icons/ai";
import { Box, LinearProgress, TextareaAutosize } from "@mui/material";
import { HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from "react-icons/hi2";
import {
  MdOutlineLibraryBooks,
  MdOutlineFeedback,
  MdOutlineKeyboardVoice,
} from "react-icons/md";
import "./css/ChatHome.css";
import "./css/Reuse.css";
import tryMonica from "../assets/images/Try-Monica.png";
import { sendChat, clearChat } from "../redux/slice/chatSlice";
import ChatHistory from "./ChatHistory";
import ChatAnimation from "./ChatAnimation";

export default function ChatHome() {
  const chatInitial = [
    {
      role: "system",
      content: "Welcome back! What would you like to chat about?",
    },
  ];

  let chatSuggestionsForTest = [
    "How do I make an HTTP request in Javascript?",
    "Artificial intelligence and technology",
    "Mental health",
  ];

  const dispatch = useDispatch();
  const storeData = useSelector((state) => state);
  const chatMsgFromStore = storeData.chatMsg;
  let [chatData, setChatData] = useState(chatInitial);
  let [chatSugg, setChatSugg] = useState(chatSuggestionsForTest);
  let [voiceResponse, setVoiceResponse] = useState(true);
  let [chatMsg, setChatMsg] = useState(undefined);
  let [chatId, setChataId] = useState(undefined);
  let [showChatHistory, setShowChatHistory] = useState(undefined);

  useEffect(() => {
    if (chatMsgFromStore?.data) {
      const newChatData = [
        ...chatData,
        { role: "system", content: chatMsgFromStore.data },
      ];
      if (newChatData !== chatData) {
        setChatData(newChatData);
        dispatch(clearChat());
      }
    }
    if (chatMsgFromStore?.selectedChatHistory) {
      const newChatData = [
        ...chatInitial,
        ...chatMsgFromStore?.selectedChatHistory?.chatData,
      ];
      setChataId(chatMsgFromStore?.selectedChatHistory._id)
      setChatData(newChatData);
      setChatSugg([]);
      dispatch(clearChat());
    }
  }, [chatMsgFromStore]);

  const onSend = () => {
    const profileData = storeData.profile || {};
    // If there is no tag to the chat, then give the first question as the tag
    const currChatId =
      chatId ||
      profileData.id + "_##_" + chatMsg + "_##_" + new Date().toLocaleString();
    if (!chatId) {
      setChataId(currChatId);
    }
    const msgToSend = { role: "user", content: chatMsg };
    setChatData([...chatData, msgToSend]);
    dispatch(
      sendChat({
        text: chatMsg,
        ...storeData.profile?.data,
        currChatId: currChatId,
      })
    );
    setChatMsg("");
    setChatSugg([]);
    // chatSuggestionsForTest = [];
  };

  const resetChatData = () => {
    setChatMsg("");
    setVoiceResponse(true);
    setChataId(undefined);
    setChatData(chatInitial);
    setChatSugg(chatSuggestionsForTest);
  };

  const renderChatData = () => {

    const renderedChatData = chatData?.map((element) => (
      <Box className="chat-holder">
        <p
          className={`${element.role === "system" ? "system-style" : "user-style"
            } chat-style`}
        >
          {/* <ChatAnimation messages={[element.content]} /> */}
          {element.content}
        </p>
      </Box>
    ));
    return (
      <>

        {/* {renderedChatData} */}
        <ChatAnimation messages={chatData} />

        {renderSuggesionButton(chatSugg)}
        {/* <p className={`system-style chat-style`}> */}
        {chatMsgFromStore?.isLoading ? (
          <LinearProgress color="secondary" />
        ) : null}
        {/* </p> */}
      </>
    );
  };

  const renderSuggesionButton = (suggesionList) => {
    const suggButton = suggesionList.map((element) => (
      <button
        className="suggestion-button"
        onClick={() => {
          setChatMsg(element);
        }}
      >
        {element}
      </button>
    ));
    return <>{suggButton}</>;
  };

  return (
    <>
      <Box className="chat-home-box">
        <Box className="chat-area">
          <img
            className="try-monica-banner"
            src={tryMonica}
            alt="try-monica-banner"
          />
          {renderChatData()}
        </Box>
        <Box className="chat-helper">
          <button className="new-chat-button" onClick={resetChatData}>
            <GrAdd className="new-chat-icon" />
            New chat
          </button>
          <button className="common-button" onClick={() => { setShowChatHistory(!showChatHistory) }}>
            <AiOutlineHistory />
            History
          </button>
          <button className="common-button">
            <MdOutlineLibraryBooks />
            Prompts
          </button>
          <MdOutlineFeedback className="float-right icon-margin" />
          {voiceResponse ? (
            <HiOutlineSpeakerWave
              className="float-right icon-margin"
              onClick={() => setVoiceResponse(!voiceResponse)}
            />
          ) : (
            <HiOutlineSpeakerXMark
              className="float-right icon-margin"
              onClick={() => setVoiceResponse(!voiceResponse)}
            />
          )}
          <TextareaAutosize
            minRows={3}
            className="chat-msg"
            value={chatMsg}
            onChange={(e) => setChatMsg(e.target.value)}
          />
          <MdOutlineKeyboardVoice className="voice-abs" />
          <AiOutlineSend onClick={onSend} className="send-abs" />
        </Box>
        {showChatHistory ? <ChatHistory handleClose={() => setShowChatHistory(false)} /> : null}
      </Box>
    </>
  );
}
