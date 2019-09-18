import credentials from '../../../credentials.json';

/**
 * action.json をここに定義する。credentials を埋め込む。
 */
const action = {
  actions: [
    {
      name: 'MAIN',
      fulfillment: {
        conversationName: 'main',
      },
      intent: {
        name: 'actions.intent.MAIN',
      },
    },
  ],
  conversations: {
    main: {
      name: 'main',
      url: credentials.fulfillmentUrl,
    },
  },
  locale: 'ja',
};

// JSON 文字列として吐き出す
console.info(JSON.stringify(action));
