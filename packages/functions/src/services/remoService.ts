import { get } from 'request-promise';
import credentials from '../../../../credentials.json';

// gateways
// -----------------------------------------------------------------------------
const REMO_TOKEN = credentials.remoToken;
const fetchDevices = async () =>
  get('https://api.nature.global/1/devices', {
    headers: { Authorization: `Bearer ${REMO_TOKEN}` },
    json: true,
  });

// services
// -----------------------------------------------------------------------------
export const getTemperatureText = async () => {
  const devices = await fetchDevices();
  return `現在の室温は${devices[0].newest_events.te.val}度です`;
};

export const getHumidityText = async () => {
  const devices = await fetchDevices();
  return `現在の湿度は${devices[0].newest_events.hu.val}パーセントです`;
};

export const getTemperatureAndHumidityText = async () => {
  const devices = await fetchDevices();
  const temperature = devices[0].newest_events.te.val;
  const humidity = devices[0].newest_events.hu.val;
  return `現在の室温は${temperature}度、湿度は${humidity}パーセントです`;
};
