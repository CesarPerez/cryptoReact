import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Note = props => {
  const { text, handlerRemove, id } = props;
  return (
    <Card sx={{ minWidth: 150 }}>
      <CardContent>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handlerRemove} value={id}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Note;
