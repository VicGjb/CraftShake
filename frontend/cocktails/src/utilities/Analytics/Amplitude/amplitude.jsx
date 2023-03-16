import amplitude from 'amplitude-js';

export function initAmplitude(){
  console.log('inint Amplitude')
  amplitude.getInstance().init("bd5dcf70ef3c0cdabb07b58abdb2a5a0");
};

export function setAmplitudeUserDevice(installationToken){
  amplitude.getInstance().setDeviceId(installationToken);
};

export function setAmplitudeUserId(userId){
  amplitude.getInstance().setUserId(userId);
};

export function setAmplitudeUserProperties(properties){
  amplitude.getInstance().setUserProperties(properties);
};

export function sendAmplitudeData (eventType, eventProperties){
  amplitude.getInstance().logEvent(eventType, eventProperties);
};