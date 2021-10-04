// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ML5 Example
Interactive LSTM Text Generation Example using p5.js
This uses a pre-trained model on a corpus of Ernest Hemingway
For more models see: https://github.com/ml5js/ml5-data-and-training/tree/master/models/lstm
=== */

// Create the LSTM Generator passing it the model directory
// original: hemingway
const lstm = ml5.LSTMGenerator("./models/naomi_osaka/", modelReady);

let textInput;
let tempSlider;
let lengthSlider;

function modelReady() {
  select('#status').html('Model Loaded');
}

function setup() {
  noCanvas();

  // Grab the DOM elements
  textInput = select('#textInput');
  lengthSlider = select('#lenSlider');
  tempSlider = select('#tempSlider');

  // Run generate anytime something changes
  textInput.input(generate);
  lengthSlider.input(generate);
  tempSlider.input(generate);
}

function generate() {
  // Update the status log
  select('#status').html('Generating...');

  // Update the length and temperature span elements
  select('#length').html(lengthSlider.value());
  select('#temperature').html(tempSlider.value());

  // Grab the original text
  let original = textInput.value();
  // Make it to lower case
  let txt = original.toLowerCase();

  // Check if there's something
  if (txt.length > 0) {
    // Here is the data for the LSTM generator
    let data = {
      seed: txt,
      temperature: tempSlider.value(),
      length: lengthSlider.value()
    };

    // Generate text with the lstm
    lstm.generate(data, (err,result)=>{
      // Update the DOM elements with typed and generated text
      select('#status').html('Ready!');
      select('#original').html(original);
      select('#prediction').html(result);
    });
  } else {
    // Clear everything
    select('#original').html('');
    select('#prediction').html('');
  }
}
