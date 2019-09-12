'use strict';

const functions = require('firebase-functions');
const { dialogflow } = require('actions-on-google');
const request = require('request-promise');

// gateways
// -----------------------------------------------------------------------------
const REMO_TOKEN = functions.config().remo.token;
const getDevices = async () => request.get('https://api.nature.global/1/devices', {
  headers: { 'Authorization': `Bearer ${REMO_TOKEN}` },
  json: true,
});

// services
// -----------------------------------------------------------------------------
const getTemperatureText = async () => {
  const devices = await getDevices();
  return `現在の室温は${devices[0].newest_events.te.val.toFixed(1)}度です`;
}

const getHumidityText = async () => {
  const devices = await getDevices();
  return `現在の湿度は${devices[0].newest_events.hu.val.toFixed(1)}パーセントです`;
}

const getTemperatureAndHumidityText = async () => {
  const devices = await getDevices();
  const temperature = devices[0].newest_events.te.val.toFixed(1);
  const humidity = devices[0].newest_events.hu.val.toFixed(1)
  return `現在の室温は${temperature}度、湿度は${humidity}パーセントです`;
}

// handlers
// -----------------------------------------------------------------------------

const app = dialogflow();

app.intent('Temperature', async conv => {
  try {
    const text = await getTemperatureText();
    return conv.close(text);
  } catch (e) {
    return conv.close(`Error: ${e}`);
  }
});

app.intent('Humidity', async conv => {
  try {
    const text = await getHumidityText();
    return conv.close(text);
  } catch (e) {
    return conv.close(`Error: ${e}`);
  }
});

app.intent('Temperature And Humidity', async conv => {
  try {
    const text = await getTemperatureAndHumidityText();
    return conv.close(text);
  } catch (e) {
    return conv.close(`Error: ${e}`);
  }
});

app.intent('Default Welcome Intent', conv => {
  conv.close('こんにちは。');
});

app.intent('Default Fallback Intent', conv => {
  conv.close('fail');
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);