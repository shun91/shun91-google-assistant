import * as functions from 'firebase-functions';
import { get } from 'request-promise';
import actionsApp from './actions';
import credentials from '../../../credentials.json';

const configuredFunctions = functions
  .runWith({ memory: '128MB' })
  .region('asia-northeast1');

/**
 * Actions SDK の fulfillment Endpoint
 */
export const main = configuredFunctions.https.onRequest(actionsApp);

/**
 * firebase functions を定期的に実行してスリープしないようにする cron job
 */
export const wakeUp = configuredFunctions.pubsub
  .schedule('0 * * * *') // 1時間に1回実行
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    console.info('start');
    const res = await get(credentials.fulfillmentUrl).catch(
      e => e.message || 'Request error but wake up is successful',
    );
    console.info('[response]', res);
    console.info('finished');
  });
