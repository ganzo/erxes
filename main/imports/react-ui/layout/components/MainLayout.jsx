import React, { PropTypes } from 'react';
import { Spinner } from '/imports/react-ui/common';
import Navigation from './Navigation.jsx';
import AlertContainer from '../../common/alert/containers/AlertContainer';


const propTypes = {
  content: PropTypes.element,
  userId: PropTypes.string,
  loggingIn: PropTypes.bool.isRequired,
};

function MainLayout({ content, userId, loggingIn }) {
  if (loggingIn) {
    return (
      <div className="full-loader">
        <Spinner />
      </div>
    );
  }

  if (!userId) {
    return false;
  }

  return (
    <div className="layout">
      <Navigation />
      {content}
      <AlertContainer />
    </div>
  );
}

MainLayout.propTypes = propTypes;

export default MainLayout;
