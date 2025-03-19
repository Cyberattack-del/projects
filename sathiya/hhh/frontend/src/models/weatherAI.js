import * as tf from '@tensorflow/tfjs';

// Sample training data (past temperature trends)
const trainingData = tf.tensor2d([[30], [32], [35], [37], [40]], [5, 1]);
const outputData = tf.tensor2d([[32], [35], [37], [40], [42]], [5, 1]);

// Creating a neural network model
const model = tf.sequential();
model.add(tf.layers.dense({ units: 10, activation: 'relu', inputShape: [1] }));
model.add(tf.layers.dense({ units: 1 }));

model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

async function trainModel() {
    await model.fit(trainingData, outputData, { epochs: 100 });
    console.log("AI Weather Model trained!");
}

async function predictWeather(temp) {
    const input = tf.tensor2d([[temp]], [1, 1]);
    const prediction = model.predict(input);
    return prediction.dataSync()[0];
}

trainModel();
export { predictWeather };