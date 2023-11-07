#!/bin/bash

git clone https://github.com/Iren137/CG
virtualenv ./computer_graphics
source ./computer_graphics/bin/activate
source ./computer_graphics/Scripts/activate
pip install -r CG/lab3/requirements.txt
python CG/lab3/main.py
