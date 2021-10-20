#!/bin/bash
# Let's call this script venv.sh
echo "Activating Venv"
source "./venv/bin/activate"

cd ./ssPythonServer || exit

python manage.py runserver

#this must be called with source activateVenv.sh