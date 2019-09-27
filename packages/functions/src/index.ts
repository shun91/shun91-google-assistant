import * as functions from 'firebase-functions';
import actionsApp from './actionsApp';
import * as fulfillmentService from './services/fulfillmentService';

const configuredFunctions = functions
  .runWith({ memory: '128MB' })
  .region('asia-northeast1');

/**
 * Actions SDK の fulfillment Endpoint
 */
export const fulfillment = configuredFunctions.https.onRequest(actionsApp);

/**
 * firebase functions を定期的に実行してスリープしないようにする cron job
 */
export const wakeUp = configuredFunctions.pubsub
  .schedule('0 * * * *') // 1時間に1回実行
  .timeZone('Asia/Tokyo')
  .onRun(fulfillmentService.wakeUp);
