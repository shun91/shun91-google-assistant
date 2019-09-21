import * as functions from 'firebase-functions';
import { actionssdk } from 'actions-on-google';
import { get } from 'request-promise';
import {
  getTemperatureText,
  getHumidityText,
  getTemperatureAndHumidityText,
} from './remoService';
import { runtimeOptions } from './runtimeOptions';
import credentials from '../../../credentials.json';

// handlers
// -----------------------------------------------------------------------------

const app = actionssdk();

app.intent('actions.intent.MAIN', async conv =>
  conv.close(`あなたは「${conv.input.raw}」と言いました`),
);

app.intent('temperature', async conv => {
  const text = await getTemperatureText();
  return conv.close(text);
});

app.intent('humidity', async conv => {
  const text = await getHumidityText();
  return conv.close(text);
});

app.intent('temperatureAndHumidity', async conv => {
  const text = await getTemperatureAndHumidityText();
  return conv.close(text);
});

export const main = functions
  .runWith(runtimeOptions)
  .region('asia-northeast1')
  .https.onRequest(app);

// cron jobs
// -----------------------------------------------------------------------------

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
