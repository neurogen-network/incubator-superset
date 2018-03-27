import React from 'react';
import ReactDOM from 'react-dom';
import { appSetup } from '../common';
import ScheduleChartContainer from './ScheduleChartContainer';

appSetup();

const scheduleChartContainer = document.getElementById('js-schedule-chart-container');

ReactDOM.render(
  <ScheduleChartContainer />,
  scheduleChartContainer,
);
