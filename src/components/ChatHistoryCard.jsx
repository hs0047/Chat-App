import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const ChatHistoryCard = ({ data, onClick }) => {
  return (
    <div>
      {data.map((item, index) => (
        <Card key={index} onClick={() => onClick(item)}>
          <CardContent>
            <Typography variant="h5" component="div">
              {item.tag}
            </Typography>
            {/* <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography> */}
            <Typography variant="caption" color="text.secondary">
              {item.date}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ChatHistoryCard;
