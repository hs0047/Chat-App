import { useEffect, useState } from "react"
import "./css/Dashboard.css"
import ChatbotHome from "./ChatbotHome.tsx"
import logo from "../assets/images/logoMonica.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Dashboard() {
    const storeData = useSelector((state) => state);
    let [isCbOpen, setIsCbOpen] = useState(false)
    const navigate = useNavigate();


    useEffect(() => {
        // navigate to login screen if no login info is stored
        if (!storeData.profile?.id)
            navigate('/')
    },);

    return <>
        <div className="Dashboard">
            DASHBOARD
            <img className={`${isCbOpen ? "d-none" : ""} btn-sticky`} onClick={() => {
                setIsCbOpen(!isCbOpen)
            }} src={logo} alt="btn-logo" />
            {isCbOpen ? <ChatbotHome closeCb={() => { setIsCbOpen(false) }} /> : null}
            {/* <Modal isOpen={isCbOpen}>
            <ChatbotHome />
        </Modal> */}
        </div>
    </>
}
export default Dashboard