import { get } from 'request-promise';
import credentials from '../../../credentials.json';

/**
 * fulfillment のエンドポイントにリクエストする
 */
export const wakeUp = async () => {
  console.info('start');
  const res = await get(credentials.fulfillmentUrl).catch(
    e => e.message || 'Request error but wake up is successful',
  );
  console.info('[response]', res);
  console.info('finished');
};
