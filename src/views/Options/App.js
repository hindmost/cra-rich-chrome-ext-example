import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Checkbox, Button, Divider } from 'semantic-ui-react';
import {
  setMatchWhole, setMatchCase,
  setColor, setColorBg, setBold, setUnderline
} from '../../actions/settings';
import './App.css';

class App extends Component {
  onCheck = (e, { name, checked }) => {
    const {setMatchWhole, setMatchCase} = this.props;
    const map = {matchWhole: setMatchWhole, matchCase: setMatchCase};
    map[name] && map[name](checked);
  }

  onToggle = (e, { name }) => {
    const {bold, underline, setBold, setUnderline} = this.props;
    const map = {bold: setBold, underline: setUnderline};
    const mapVals = {bold, underline};
    map[name] && map[name](!mapVals[name]);
  }

  onColor = (e) => {
    const {name, value} = e.target;
    const {setColor, setColorBg} = this.props;
    const map = {color: setColor, colorBg: setColorBg};
    name && map[name] && map[name](value);
  }

  render() {
    const { matchWhole, matchCase, color, colorBg, bold, underline } = this.props;
    return (
      <div className='App'>
        <h2>Keyword Marker: Settings</h2>
        <Form>
          <Divider />
          <Form.Field>
            <Checkbox toggle name='matchWhole' label='Match whole word' defaultChecked={Boolean(matchWhole)} onChange={this.onCheck} />
          </Form.Field>
          <Divider />
          <Form.Field>
            <Checkbox toggle name='matchCase' label='Match case' defaultChecked={Boolean(matchCase)} onChange={this.onCheck} />
          </Form.Field>
          <Divider />
          <Form.Group inline>
            <Form.Field>
              <label>Mark Color:</label>
            </Form.Field>
            <Form.Group inline>
              <Form.Field>
                <input type='color' name='colorBg' className='color-field' title='Background Color' value={colorBg} onChange={this.onColor} />
              </Form.Field>
              <Form.Field>
                <input type='color' name='color' className='color-field' title='Text Color' value={color} onChange={this.onColor} />
              </Form.Field>
            </Form.Group>
          </Form.Group>
          <Divider />
          <Form.Group inline>
            <Form.Field>
              <label>Mark Style:</label>
            </Form.Field>
            <Form.Field>
              <Button.Group>
                <Button icon='bold' name='bold' title='Bold' active={Boolean(bold)} onToggle={this.onToggle} />
                <Button icon='underline' name='underline' title='Underline' active={Boolean(underline)} onToggle={this.onToggle} />
              </Button.Group>
            </Form.Field>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => state.settings;

const mapDispatchToProps = dispatch => ({
  setMatchWhole: data => {
    dispatch(setMatchWhole(data));
  },
  setMatchCase: data => {
    dispatch(setMatchCase(data));
  },
  setColor: data => {
    dispatch(setColor(data));
  },
  setColorBg: data => {
    dispatch(setColorBg(data));
  },
  setBold: data => {
    dispatch(setBold(data));
  },
  setUnderline: data => {
    dispatch(setUnderline(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
