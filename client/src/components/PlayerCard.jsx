import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import colors from './colors';
import './PlayerCard.css';

const avatar = letter => (<Avatar>{letter}</Avatar>)

const styles = {
  width: 400
};

const numberStyles = {
  fontFamily: 'Open Sans, sans-serif'
};

const PlayerCard = ({id, name, score, bid, tricks}) => (
  <MuiThemeProvider>
      <div className="PlayerCard--container">
        <Card style={styles}>
          <div className="PlayerCard--items">
            <div className="name">
              <Avatar backgroundColor={colors[id]}>{name[0]}</Avatar>
              <h3>{name}</h3>
            </div>
            <div className="data">
              <CardTitle
                title={score}
                subtitle="Score"
                titleStyle={numberStyles}
              />
              <CardTitle
                title={`${tricks} / ${bid}`}
                subtitle="Tricks"
                titleStyle={numberStyles}
              />
            </div>
          </div>
        </Card>
      </div>
  </MuiThemeProvider>
);

export default PlayerCard;
