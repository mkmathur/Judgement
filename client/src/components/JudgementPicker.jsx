import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Slider from 'material-ui/Slider';
import RaisedButton from 'material-ui/RaisedButton';
import './JudgementPicker.css';

injectTapEventPlugin();

class JudgementPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  handleSlider(e, value) {
    this.setState({
      value: value
    });
  }

  render() {
    const rootStyle = {
      width: 100 * this.props.max,
      maxWidth: 480
    };

    return (
      <MuiThemeProvider>
        <div className="JudgementPicker--container">
          <h2>How many tricks will you make?</h2>
          <div className="controls">
            <div className="slider">
              <h3>{this.state.value}</h3>
              <Slider
                min={0}
                max={this.props.max}
                step={1}
                value={0}
                defaultValue={0}
                onChange={this.handleSlider.bind(this)}
                style={rootStyle}
              />
            </div>
            <div className="Button--container">
              <RaisedButton label="OK" primary />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default JudgementPicker;
