import * as functions from 'firebase-functions';
import { get } from 'request-promise';
import { runtimeOptions } from './runtimeOptions';
import actionsApp from './actions';
import credentials from '../../../credentials.json';

/**
 * Actions SDK の fulfillment Endpoint
 */
export const main = functions
  .runWith(runtimeOptions)
  .region('asia-northeast1')
  .https.onRequest(actionsApp);

/**
 * firebase functions を定期的に実行してスリープしないようにする cron job
 */
export const wakeUp = functions
  .runWith(runtimeOptions)
  .region('asia-northeast1')
  .pubsub.schedule('0 * * * *') // 1時間に1回実行
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    console.info('start');
    const res = await get(credentials.fulfillmentUrl).catch(
      e => e.message || 'Request error but wake up is successful',
    );
    console.info('[response]', res);
    console.info('finished');
  });
