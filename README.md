# Training a LSTM network

Training demo [from here](https://blog.paperspace.com/training-an-lstm-and-using-the-model-in-ml5-js/).

## Workflow

Modify is run.sh

```txt
python train.py --data_dir=./data/michael-richards \
--rnn_size 128 \
--num_layers 2 \
--seq_length 50 \
--batch_size 50 \
--num_epochs 50 \
--save_checkpoints ./checkpoints \
--save_model /artifacts
```

```txt
paperspace jobs create --container tensorflow/tensorflow:1.5.1-gpu-py3 --machineType P5000 --command "bash run.sh" --project 'LSTM training'
```

Find the job id:

```txt
Uploading training-lstm.zip [========================================] 470788/bps 100% 0.0s
New jobId: jbd7kthhi31jn3ra
```

The default can also be set in train.py line 35:

```py
parser.add_argument('--data_dir', type=str, default='data/default',
  help='data directory containing input.txt')
```

```txt
cd ml5js_example/models
paperspace jobs artifactsGet --jobId jbd7kthhi31jn3ra
cd ../..
python -m http.server
(or for Python 2)
python -m SimpleHTTPServer
```

## Getting started

```txt
PS C:\Users\timof\repos\python\training-lstm> paperspace jobs create --container tensorflow/tensorflow:1.5.1-gpu-py3 --machineType P5000 --command 'bash run.sh' --project 'LSTM training'
Zipping directory training-lstm [========================================] 21191429/bps 100% 0.0s
Uploading training-lstm.zip [========================================] 533053/bps 100% 0.0s
{
  "error": "You are not authorized for P5000 machines, please upgrade your subscription.",
  "status": 401
}
PS C:\Users\timof\repos\python\training-lstm> paperspace jobs create --container tensorflow/tensorflow:1.5.1-gpu-py3 --command 'bash run.sh' --project 'LSTM training'                    
Zipping directory training-lstm [========================================] 21532350/bps 100% 0.0s
Uploading training-lstm.zip [========================================] 475003/bps 100% 0.0s
{
  "error": "You are not authorized for K80 machines, please upgrade your subscription.",
  "status": 401
}
```

Hi,

I'm trying out the LSTM demo from your tutorial: https://blog.paperspace.com/training-an-lstm-and-using-the-model-in-ml5-js/
There it suggest using a P5000 machine.  This results in the error;
"error": "You are not authorized for P5000 machines, please upgrade your subscription.",
Without the --machineType flag, it tries to use the K80 machine, which again, I am not authorized to use.  I couldn't find any info on what machines I am authorized to used.

Can you please point me in the right direction so I can continue to evaluate your service?

Thanks.

Went ahead and got a paid account realizing may as well.

```txt
PS C:\Users\timof\repos\python\training-lstm> paperspace jobs create --container tensorflow/tensorflow:1.5.1-gpu-py3 --machineType P5000 --command 'bash run.sh'
Zipping directory training-lstm [========================================] 21780015/bps 100% 0.0s
Uploading training-lstm.zip [========================================] 578102/bps 100% 0.0s
New jobId: j1py0oe1pg0ym3yo
Cluster: PS Jobs
Git commit: b0a1b7a
Job Pending
Waiting for job to run...
Job Running
Storage Region: East Coast (NY2)
Awaiting logs...
Here we go! Reading text file...
{"chart": "loss", "axis": "Iteration"}
...
{"chart": "loss", "x": 98, "y": 3.238658}
98/100 (epoch 49), train_loss = 3.239, time/batch = 0.035
{"chart": "loss", "x": 99, "y": 3.222741}
99/100 (epoch 49), train_loss = 3.223, time/batch = 0.027
Model saved to ./checkpoints/zora_neale_hurston/zora_neale_hurston!
Converting model to ml5js: zora_neale_hurston zora_neale_hurston-99
Done! The output model is in /artifacts
Check https://ml5js.org/docs/training-lstm for more information.
Job Stopped, exitCode 0
```

cd ml5js_example/models

paperspace jobs artifactsGet --jobId j1py0oe1pg0ym3yo

Now there is a new directory:

ml5js_example\models\zora_neale_hurston

So in the ml5js_example\sketch.js file, add that here:

const lstm = ml5.LSTMGenerator('./PATH_TO_YOUR_MODEL', onModelReady);

Like this:

const lstm = ml5.LSTMGenerator("models/zora_neale_hurston/", modelReady);

Now start the server:

python -m SimpleHTTPServer

Then, going to his url: http://localhost:8000/ml5js_example/

```txt
🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈
🌟 Thank you for using ml5.js v0.6.1 🌟

Please read our community statement to ensure 
that the use of this software reflects the values 
of the ml5.js community:
↳ https://ml5js.org/about

Reporting: 
↳ https://github.com/ml5js/ml5-library/issues
↳ Email: info@ml5js.org 
🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈
sketch.js:14 Uncaught TypeError: ml5.LSTMGenerator is not a function
    at sketch.js:14
(anonymous) @ sketch.js:14
sketch.js:28 Uncaught ReferenceError: Cannot access 'textInput' before initialization
    at setup (sketch.js:28)
    ...
    at e (p5.min.js:7)
setup @ sketch.js:28
...
(anonymous) @ p5.min.js:1
DevTools failed to load source map: Could not load content for https://unpkg.com/ml5.min.js.map: HTTP error: status code 404, net::ERR_HTTP_RESPONSE_CODE_FAILURE
```

I think that CDN is out of date.  Get a newer one.  But still:

```txt
ml5.LSTMGenerator is not a function
```

"for the latest version, we need to use charRNN instead of LSTMGenerator."

After this change, the prediction result is [object Object].

Looking at the object, maybe it should be this now: result.sample?

The result for the Christina Applegate model is:

"t u oes anio o tsMtn t b l tee g h aune s tnSas d a o he s , h n . eise haio 5 g aa tio P l te. n"

No English there.  Also, why is the model named Zora Neale Hurston?  Shouldn't it be Christina Applegate?

Did we download the wrong model?

Model saved to ./checkpoints/zora_neale_hurston/zora_neale_hurston!
Converting model to ml5js: zora_neale_hurston zora_neale_hurston-99
Done! The output model is in /artifacts
Check https://ml5js.org/docs/training-lstm for more information.

Oh, that was the name of the sample data dir.

Let's try that again.

paperspace jobs create --container tensorflow/tensorflow:1.5.1-gpu-py3 --machineType P5000 --command 'bash run.sh'

cd ml5js_example/models

paperspace jobs artifactsGet --jobId jtmdpcynuqpc1ogd

Now there is a new model.  But still no English in the prediction:

"aekee eMissn aer oa c9beaWwdvof e.roee .ht . rnedpiAk rte o o4: hwk.tsa n asen G nt"

Not a great start.

## Using ml5 v1.1

Reverted to an earlier 1.1 version of ml5.js and using Python 2.7.15.

ml5js_example\models\christina_applegate

```txt
paperspace jobs create --container tensorflow/tensorflow:1.5.1-gpu-py3 --machineType P5000 --command 'bash run.sh'
...
paperspace jobs artifactsGet --jobId jev71a7mrn1wx4a1
{
  "error": "The difference between the request time and the current time is too large."
}
```

Oh, my local clock was out of whack.  Sync that, and run again.  The model is added to the root directory, so maybe this command should be run inside the ml5js_example directory?  Even after moving the model to it's proper spot, this is the output.

"I am" o s Mtu o n au at oe e ao shd e einrn odtn neo aa , itte hsa Kin elisa ale av toaeeen r tteha

Not any better.  Time to get 7000 more lines of text to train with.  Back to Nest.

## Original readme

Multi-layer Recurrent Neural Networks (LSTM, RNN) for character-level language models in Python using Tensorflow and modified to work with [tensorflow.js](https://js.tensorflow.org/) and [ml5js](https://ml5js.org/)

Based on [char-rnn-tensorflow](https://github.com/sherjilozair/char-rnn-tensorflow).

## Requirements

Set up a python environment with tensorflow installed. [More detailed instructions here](../)

## Usage

### 1) Train

Inside the `/data` folder, create a new folder with the name of your data. Inside that folder should be one file called `input.txt`
(A quick tip to concatenate many small disparate `.txt` files into one large training file: `ls *.txt | xargs -L 1 cat >> input.txt`)
Then run:

```bash
python train.py --data_dir=./data/my_own_data
```

You can specify the hyperparameters:

```bash
python train.py --data_dir=./data/my_own_data --rnn_size 128 --num_layers 2 --seq_length 64 --batch_size 32 --num_epochs 1000
```

This will train your model and save the model, **in the globals `./models` folder**, in a format usable in javascript. 

### 2) Run!

To work with the model in ML5, you'll just need to point to the new folder in your sketch:

```javascript
var lstm = new ml5.LSTMGenerator('./models/your_new_model');
```

That's it!

## Hyperparameters

_Thanks to Ross Goodwin!_

Given the size of the training dataset, you can use:

* 2 MB: 
   - rnn_size 256 (or 128) 
   - layers 2 
   - seq_length 64 
   - batch_size 32 
   - dropout 0.25
* 5-8 MB: 
  - rnn_size 512 
  - layers 2 (or 3) 
  - seq_length 128 
  - batch_size 64 
  - dropout 0.25
* 10-20 MB: 
  - rnn_size 1024 
  - layers 2 (or 3) 
  - seq_length 128 (or 256) 
  - batch_size 128 
  - dropout 0.25
* 25+ MB: 
  - rnn_size 2048 
  - layers 2 (or 3) 
  - seq_length 256 (or 128) 
  - batch_size 128 
  - dropout 0.25

## Tensorboard

Tensorflow comes with [Tensorboard](https://github.com/tensorflow/tensorboard): "a suite of web applications for inspecting and understanding your TensorFlow runs and graphs.".

To visualize training progress, model graphs, and internal state histograms: fire up Tensorboard and point it at your `log_dir`:

```bash
$ tensorboard --logdir=./logs/
```

Then open a browser to [http://localhost:6006](http://localhost:6006) or the correct IP/Port specified.
