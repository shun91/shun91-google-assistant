import { https } from 'firebase-functions';
import { actionssdk } from 'actions-on-google';
import { get } from 'request-promise';
import credentials from '../../../credentials.json';

// gateways
// -----------------------------------------------------------------------------
const REMO_TOKEN = credentials.remoToken;
const getDevices = async () =>
  get('https://api.nature.global/1/devices', {
    headers: { Authorization: `Bearer ${REMO_TOKEN}` },
    json: true,
  });

// services
// -----------------------------------------------------------------------------
const getTemperatureText = async () => {
  const devices = await getDevices();
  return `現在の室温は${devices[0].newest_events.te.val.toFixed(1)}度です`;
};

const getHumidityText = async () => {
  const devices = await getDevices();
  return `現在の湿度は${devices[0].newest_events.hu.val.toFixed(
    1,
  )}パーセントです`;
};

const getTemperatureAndHumidityText = async () => {
  const devices = await getDevices();
  const temperature = devices[0].newest_events.te.val.toFixed(1);
  const humidity = devices[0].newest_events.hu.val.toFixed(1);
  return `現在の室温は${temperature}度、湿度は${humidity}パーセントです`;
};

// handlers
// -----------------------------------------------------------------------------

const app = actionssdk();

app.intent('actions.intent.MAIN', async conv => {
  return conv.close(`あなたは「${conv.input.raw}」と言いました`);
});

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

export const main = https.onRequest(app);
