import React, { Component } from 'react';
import moment from 'moment';
import DemoData from './DemoData';
import Scheduler, {
  SchedulerData,
  ViewTypes,
  DATE_FORMAT,
} from 'react-big-scheduler';
import withDragDropContext from './withDnDContext';
import 'react-big-scheduler/lib/css/style.css';

class Basic extends Component {
  constructor(props) {
    super(props);

    moment.locale('en-us');
    let schedulerData = new SchedulerData(
      new moment('2020-11-16').format(DATE_FORMAT),
      ViewTypes.Month,
      false,
      false,

      {
        resourceName: 'Slot #',
        // minuteStep: 15
      }
    );
    schedulerData.localeMoment.locale('en-us');
    schedulerData.setResources(DemoData.resources);
    schedulerData.setEvents(DemoData.events);
    this.state = {
      viewModel: schedulerData,
    };
  }

  render() {
    const { viewModel } = this.state;
    return (
      <div>
        <div>
          <Scheduler
            schedulerData={viewModel}
            eventItemTemplateResolver={this.eventItemTemplateResolver}
          />
        </div>
      </div>
    );
  }

  eventItemTemplateResolver = (schedulerData, event, mustAddCssClass) => {
    let todayDate = moment();
    let startDate = event.start;
    let endDate = event.end;
    let titleText = schedulerData.behaviors.getEventTextFunc(
      schedulerData,
      event
    );
    let backgroundColor;

    if (todayDate.isBetween(startDate, endDate)) {
      backgroundColor = '#0ECAA8';
    } else {
      backgroundColor = '#F3A023';
    }

    let divStyle = {
      backgroundColor: backgroundColor,
    };

    return (
      <div key={event.id} className={mustAddCssClass} style={divStyle}>
        <span style={{ color: '#FFFFFF', margin: '4px' }}>{titleText}</span>
      </div>
    );
    // false
  };
}

export default withDragDropContext(Basic);
