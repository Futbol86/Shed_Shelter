import React from 'react';
import PropTypes from 'prop-types';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
const localizer = momentLocalizer(moment);

const ContructionPlanner = ({ contructionPlanners }) => {
    var events = [];
    contructionPlanners.map(item => {
        var jobNumber = item.quoteDetail && item.quoteDetail.jobNumber;
        var agentName = item.quoteDetail && item.quoteDetail.client && item.quoteDetail.client.agentName;
       
        var event = {
            start: moment(item.estimatedStartDate).toDate(),
            end: moment(item.estimatedCompletionDate).toDate(),
            title: "Agent Name: " + agentName + " - Job Number: " + jobNumber
        }

        events.push(event);
    });

    return (
        <div className="animated fadeIn">
            <Calendar 
                localizer={localizer}
                defaultDate={new Date()}
                defaultView='month'
                events={events}
                style={{ height: 500 }}
            />
        </div>
    )
};

ContructionPlanner.propTypes = {
    contructionPlanners: PropTypes.array
};

export default ContructionPlanner;