import * as React from 'react';
import './css/ChatbotHome.css';
import logo from "../assets/images/monica.png";
import { Typography, Box, Divider, Tabs, Tab } from '@mui/material';
import { HiDevicePhoneMobile } from "react-icons/hi2";
import { TbMessage2, TbSettings } from "react-icons/tb";
import { CgArrowsExpandRightAlt, CgProfile, CgClose } from "react-icons/cg"
import ComposeHome from './ComposeHome';
import ChatHome from './ChatHome';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function ChatbotHome(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box className="home">
      <Box className="chatTitle" sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <img className="logo" src={logo} alt="my-logo" />
        <Box sx={{
          display: 'flex',
          float: "right",
          alignItems: 'center',
          width: 'fit-content',
          borderRadius: 1,
          bgcolor: 'background.paper',
          color: 'text.secondary',
          '& svg': {
            m: 1,
          },
          '& hr': {
            mx: 0.2,
          },
        }}>
          <HiDevicePhoneMobile />
          <Divider orientation="vertical" flexItem />
          <CgArrowsExpandRightAlt />
          <Divider orientation="vertical" flexItem />
          <TbMessage2 />
          <TbSettings />
          <CgProfile />
          <CgClose className='btn-close' onClick={props.closeCb}/>
        </Box>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="Chat Nav">
          <Tab className='pb-0' label="Chat" {...a11yProps(0)} />
          <Tab className='pb-0' label="Compose" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ChatHome />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ComposeHome />
      </TabPanel>
    </Box>
  );
}
