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
    {
      name: 'temperature',
      fulfillment: {
        conversationName: 'main',
      },
      intent: {
        name: 'temperature',
        trigger: {
          queryPatterns: ['現在の室温'],
        },
      },
    },
    {
      name: 'humidity',
      fulfillment: {
        conversationName: 'main',
      },
      intent: {
        name: 'humidity',
        trigger: {
          queryPatterns: ['現在の湿度'],
        },
      },
    },
    {
      name: 'temperatureAndHumidity',
      fulfillment: {
        conversationName: 'main',
      },
      intent: {
        name: 'temperatureAndHumidity',
        trigger: {
          queryPatterns: ['現在の室温と湿度'],
        },
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
