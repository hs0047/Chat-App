import "./css/Reuse.css"
import "./css/ComposeHome.css"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Box, Divider, TextareaAutosize } from "@mui/material"
import { HiOutlineTemplate } from "react-icons/hi"
import { FaAlignLeft } from 'react-icons/fa'
import { BsFileEarmarkText, BsStarFill } from 'react-icons/bs'
import { IoLanguageSharp } from 'react-icons/io5'
import { GiDrippingStar, GiSpeaker } from 'react-icons/gi'
import { TfiReload } from "react-icons/tfi"
import { clearComposeMessage, composeMessage } from "../redux/slice/composeSlice";


const lengthOptions = ["Auto", "Short", "Medium", "Long"]
const formatOptions = ["Auto", "Email", "Message", "Comment", "Paragraph", "Article", "Blog Post", "Ideas", "Outline", "Twitter"]
const toneOptions = ["Auto", "Amicable", "Casual", "Friendly", "Professional", "Witty", "Funy", "Formal"]
const languageOptions = ["Auto", "English"]

export default function ComposeHome() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    let [generateDraft, setGenerateDraft] = useState(false)
    let [draft, setDraft] = useState(undefined)
    let [outputMsg, setOutputMsg] = useState(undefined)
    let [filters, setFilters] = useState({
        length: "Auto",
        format: "Auto",
        tone: "Auto",
        language: "Auto"
    })
    let [isAddToFocus, setAddToFocus] = useState(false)

    useEffect(() => {
        const formattedMsgFromRedux = state.composeMsg?.fomattedData
        if (formattedMsgFromRedux) {
            setOutputMsg(formattedMsgFromRedux)
            dispatch(clearComposeMessage())
        }
    }, [state.composeMsg]);

    const onGenerateClick = () => {
        setGenerateDraft(true)
        dispatch(composeMessage({ id: state.profile?.data?.id, text: draft, filters: filters }));
    }

    // Method to create multiple buttons at once, just need to pass the list with button name
    const generateButtons = (props) => {
        const abc = props.elements.map(element => <button
            onClick={() => {
                setFilters({ ...filters, [props.type]: element })
            }}
            className={`${props.value === element ? "selected-button" : ""} label-radio-button`}
            key={element}>{element}</button>);
        return <Box className='button-group'>
            {abc}
            <br />
        </Box>
    }

    return <>
        <Box className="compose-label">
            <Box className="float-left">Write About</Box>
            <Box className="float-right mypt-1 color-secondary"> Template</Box>
            <HiOutlineTemplate className="float-right mt-1 mx-1 color-secondary" />
        </Box>
        <TextareaAutosize
            minRows={4}
            placeholder="Tell me what to write for you."
            className="text-area-compose"
            value={draft}
            onChange={(e) =>
                setDraft(e.target.value)
            }
        />
        <Box className="compose-label">
            <FaAlignLeft className="float-left mx-2 my-1" />
            <Box className="float-left">Length</Box>
        </Box>
        {generateButtons({ elements: lengthOptions, value: filters.length, type: "length" })}
        <Box className="compose-label">
            <BsFileEarmarkText className="float-left mx-2 my-1" />
            <Box className="float-left">Format</Box>
        </Box>
        {generateButtons({
            elements: formatOptions, value: filters.format, type: "format"
        }
        )}
        <Box className="compose-label">
            <BsStarFill className="float-left mx-2 my-1" />
            <Box className="float-left">Tone</Box>
        </Box>
        {generateButtons({ elements: toneOptions, value: filters.tone, type: "tone" })}
        <Box className="compose-label">
            <IoLanguageSharp className="float-left mx-2 my-1" />
            <Box className="float-left">Language</Box>
        </Box>
        {generateButtons({ elements: languageOptions, value: filters.language, type: "language" })}
        <button className={` ${draft ? "" : "disabled-generate-button "} generate-draft-button`}
            onClick={onGenerateClick}>
            Generate Draft
        </button>
        {/* conditionally rendering the output screen */}
        {generateDraft ? <Box>
            <Divider className="common-divider" />
            <Box className="compose-label pt-3">
                <GiDrippingStar className="float-left mx-2 my-1" />
                <Box className="float-left">Preview</Box>
                <TfiReload className="float-right mx-2 my-1" />
                <GiSpeaker className="float-right mx-2 my-1" />
            </Box>
            <TextareaAutosize
                minRows={4}
                className="text-area-compose"
                value={outputMsg}
                onChange={(e) =>
                    setOutputMsg(e.target.value)
                } />
            {outputMsg ? <Box>
                <button className={` ${isAddToFocus ? "" : "disabled-copy-button"} copy-button`}>
                    Add to Focused Input
                </button>
                <button
                    onClick={() => { navigator.clipboard.writeText(outputMsg) }}
                    className="copy-button">
                    Copy
                </button>
            </Box> : null}
        </Box> : null}
    </>
}