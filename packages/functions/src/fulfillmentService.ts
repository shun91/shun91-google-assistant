import { get } from 'request-promise';
import credentials from '../../../credentials.json';

// gateways
// -----------------------------------------------------------------------------
const fetchFulfillment = async () => get(credentials.fulfillmentUrl);

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
