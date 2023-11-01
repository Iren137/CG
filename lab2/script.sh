#!/bin/bash

git clone https://github.com/Iren137/CG
virtualenv ./computer_graphics
source ./computer_graphics/bin/activate
source ./computer_graphics/Scripts/activate
pip install -r CG/lab2/requirements.txt
python main.py
