import EJSON from 'meteor-ejson';
import { SENDING_ATTACHMENT, ATTACHMENT_SENT } from '../constants';
import { call } from '../erxes';
import uploadHandler from '../uploadHandler';
import { changeConversation } from './messenger';


export const readMessages = conversationId =>
  () => call('customerReadMessages', conversationId);

export const sendMessage = (message, attachments) =>
  (dispatch, getState) => {
    // current conversation
    const currentConversationId = getState().activeConversation;

    // message object
    const doc = {
      conversationId: currentConversationId,
      message,
      attachments,
    };

    return call('sendMessage', doc)
      .then(({ conversationId }) => {
        // if there is no current conversation new conversation will be created
        if (!currentConversationId) {
          dispatch(changeConversation(conversationId));
        }
      });
  };

export const sendFile = file =>
  (dispatch, getState) => {
    uploadHandler({
      file,
      uploadAction: ({ data, fileInfo }) => {
        dispatch({ type: SENDING_ATTACHMENT });

        // file object
        const doc = {
          name: file.name,
          data: EJSON.toJSONValue(data),
        };

        call('sendFile', doc).then(response => {
          dispatch({ type: ATTACHMENT_SENT });

          const attachment = Object.assign({ url: response.url }, fileInfo);

          // send message with attachment
          // QUESTION: Do we need to make 2 calls to send a message with attachment?
          sendMessage('This message has an attachment', [attachment])(dispatch, getState);
        });
      },
    });
  };
