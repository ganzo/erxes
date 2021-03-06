import React, { PropTypes } from 'react';
import moment from 'moment';
import { NameCard } from '/imports/react-ui/common';
import { Wrapper } from '/imports/react-ui/layout/components';


const propTypes = {
  ticket: PropTypes.object.isRequired,
};

function RightSidebar({ ticket }) {
  const customer = ticket.customer();

  return (
    <Wrapper.Sidebar size="wide">
      <Wrapper.Sidebar.Section>
        <h3>Customer details</h3>
        <ul className="filters no-link">
          <li>
            <NameCard customer={customer} avatarSize={50} />
          </li>
          <li></li>
          <li>
            Last active
            <span className="counter">{moment(customer.lastSeenAt).fromNow()}</span>
          </li>

          {customer.getData().map((data, index) => (
            <li key={index}>
              <span className="capitalize">{data.name}</span>
              <span className="counter">{data.value}</span>
            </li>
          ))}
        </ul>
      </Wrapper.Sidebar.Section>
    </Wrapper.Sidebar>
  );
}

RightSidebar.propTypes = propTypes;

export default RightSidebar;
