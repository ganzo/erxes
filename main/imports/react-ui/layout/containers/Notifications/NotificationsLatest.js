import { Meteor } from 'meteor/meteor';
import { Notifications } from 'meteor/erxes-notifications';
import { composeWithTracker } from 'react-komposer';
import { NotificationsLatest } from '../../components';


function composer(props, onData) {
  const handler = Meteor.subscribe('notifications.latest', {
    limit: 10,
    requireRead: false,
  });

  if (handler.ready()) {
    const createdUserIds = [];
    const notifications = Notifications.find().fetch();

    notifications.map((notification) =>
      createdUserIds.push(notification.createdUser)
    );

    Meteor.subscribe('users.list', { ids: createdUserIds });

    onData(null, { notifications });
  }
}

export default composeWithTracker(composer)(NotificationsLatest);
