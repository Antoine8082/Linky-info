'use strict'

import mqtt from 'mqtt';

const brokerUrl = 'mqtt://192.168.1.49';
const options = {
  username: 'ManonAntoine',
  password: 'Sandman0303'
};

const topics = {
  'teleinfokit/data/PAPP': {
    name: 'instant consumption',
    unit: 'VA'
  },
  'teleinfokit/data/IINST': {
    name: 'Instant intensity',
    unit: 'A'
  }
};

function handleMessage(receivedTopic, message) {

  const topicInfo = topics[receivedTopic];

  if (topicInfo) {

    const value = message.toString();
    console.log(`${topicInfo.name}: ${value} ${topicInfo.unit}`);
  }
}

const client = mqtt.connect(brokerUrl, options);

client.on('connect', () => {

  console.log(`Connected to MQTT broker: ${brokerUrl}`);

  for (const topic of Object.keys(topics)) {

    client.subscribe(topic, (err) => {

      if (err) {

        console.error(`Error subscribing to topic: ${topic}: `, err);

      } else {

        console.log(`Successfully subscribed to topic: ${topic}`);
      }
    });
  }
});

client.on('message', handleMessage);

client.on('error', (err) => {
  console.error('MQTT connection error:', err);
});

client.on('offline', () => {
  console.log('MQTT client disconnected');
});

client.on('reconnect', () => {
  console.log('Attempt to reconnect to MQTT broker');
});




// import mqtt from 'mqtt';

// const brokerUrl = 'mqtt://192.168.1.49';
// const topicPower = 'teleinfokit/data/PAPP';
// const topicIntensity = 'teleinfokit/data/IINST';

// const options = {
//     username: 'ManonAntoine',
//     password: 'Sandman0303'
// };

// const client = mqtt.connect(brokerUrl, options);

// client.on('connect', () => {

//     console.log(`Connecté au broker MQTT: ${brokerUrl}`);
//     client.subscribe(topicPower, (err) => {

//         if (err) {

//             console.error(`Erreur lors de l'abonnement au sujet ${topicPower}: `, err);

//         } else {

//             console.log(`Abonné avec succès au sujet ${topicPower}`);
//         }
//     });

//     client.subscribe(topicIntensity, (err) => {

//         if (err) {

//             console.error(`Erreur lors de l'abonnement au sujet ${topicIntensity}: `, err);

//         } else {

//             console.log(`Abonné avec succès au sujet ${topicIntensity}`);
//         }
//     });
// });

// client.on('message', (receivedTopic, message) => {

//     if (receivedTopic === topicPower) {

//         const instantPower = message.toString();
//         console.log(`Consommation instantanée: ${instantPower} VA`);

//     } else if (receivedTopic === topicIntensity) {

//         const instantIntensity = message.toString();
//         console.log(`Intensité instantanée: ${instantIntensity} A`);
//     }
// });

// client.on('error', (err) => {
//     console.error('Erreur de connexion MQTT:', err);
// });

// client.on('offline', () => {
//     console.log('Client MQTT déconnecté');
// });

// client.on('reconnect', () => {
//     console.log('Tentative de reconnexion au broker MQTT');
// });
