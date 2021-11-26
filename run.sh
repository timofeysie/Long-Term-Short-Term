#!/bin/bash

python train.py --data_dir=./data/Damien_Lillard_Anti_satellite_weapon_mashup \
--rnn_size 128 \
--num_layers 2 \
--seq_length 50 \
--batch_size 50 \
--num_epochs 50 \
--save_checkpoints ./checkpoints \
--save_model /artifacts