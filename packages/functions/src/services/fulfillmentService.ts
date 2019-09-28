import { post } from 'request-promise';
import credentials from '../../../../credentials.json';

// gateways
// -----------------------------------------------------------------------------
const fetchFulfillment = async () =>
  post(credentials.fulfillmentUrl, {
    // 500 が返って来ないように intent を指定する
    body: { inputs: [{ intent: 'actions.intent.MAIN' }] },
    json: true,
  });

// services
// -----------------------------------------------------------------------------

/**
 * fulfillment のエンドポイントにリクエストする
 */
export const wakeUp = async () => {
  console.info('start');
  const res = await fetchFulfillment().catch(
    e => e.message || 'Request error but wake up is successful',
  );
  console.info('[response]', res);
  console.info('finished');
};
