import { actionssdk } from 'actions-on-google';
import {
  getTemperatureText,
  getHumidityText,
  getTemperatureAndHumidityText,
} from './remoService';

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

export default app;
