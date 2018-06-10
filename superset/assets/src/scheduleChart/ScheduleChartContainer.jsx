import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Panel, Grid, Row, Col,
  FormGroup, ControlLabel, FormControl, HelpBlock,
  InputGroup, Glyphicon
} from 'react-bootstrap';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import {t} from '../locales';
import moment from 'moment';


const FREQUENCY_OPTIONS = ['once', 'day', 'week', 'month', 'quarter', 'year'];
const VISIBILITY_OPTIONS = ['public', 'private'];

const prettyDate = (dttm) => dttm.format().substring(0, 19)

const propTypes = {
  datasources: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
};

const FieldGroup = ({id, label, help, ...props}) => {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
};

export default class ScheduleChartContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      frequency: 'once',
      visibility: 'private',
      startDate: '',
      endDate: ''
    };
  }

  isBtnDisabled() {
    return !(this.state.name && this.state.frequency && this.state.startDate);
  }

  setStartDate(startDate) {
    this.setState({startDate: prettyDate(startDate)})
  }

  setEndDate(endDate) {
    this.setState({endDate: prettyDate(endDate)})
  }

  onFrequencyChange(event) {
    this.setState({frequency: event.target.value})
  }

  onVisbilityChange(event) {
    this.setState({visibility: event.target.value})
  }

  onNameChange(event) {
    this.setState({name: event.target.value})
  }

  render() {
    return (
      <div className="container">
        <Panel header={<h3>{t('Schedule a Report')}</h3>}>
          <Grid>
            <Row>
              <Col xs={12} sm={6}>
                <form>
                  <FieldGroup
                    id="scheduledReportName"
                    type="text"
                    label="Report Name"
                    placeholder="Choose a name"
                    onChange={this.onNameChange.bind(this)}
                  />
                  <FormGroup controlId="scheduledReportFrequency">
                    <ControlLabel>Frequency</ControlLabel>
                    <FormControl
                      componentClass="select"
                      placeholder="select"
                      value={this.state.frequency}
                      onChange={this.onFrequencyChange.bind(this)}
                    >
                      {
                        FREQUENCY_OPTIONS.map((option, index) => (
                          <option value={option} key={`freq-${index}`}>
                            {option === 'once' ? 'Once' : `Every ${option}`}
                          </option>
                        ))
                      }
                    </FormControl>
                  </FormGroup>
                  <ControlLabel>Start Date</ControlLabel>
                  <InputGroup bsSize="small">
                    <InputGroup.Addon>
                      <Glyphicon glyph="calendar"/>
                    </InputGroup.Addon>
                    <Datetime
                      dateFormat="YYYY-MM-DD"
                      defaultValue={this.state.startDate}
                      onChange={this.setStartDate.bind(this)}
                    />
                  </InputGroup>
                  <br /><br />
                  <Button
                    bsStyle="primary"
                    disabled={this.isBtnDisabled()}
                  >
                    {t('Schedule')}
                  </Button>
                </form>
              </Col>
            </Row>
          </Grid>
        </Panel>
      </div>
    );
  }
}

ScheduleChartContainer.propTypes = propTypes;
