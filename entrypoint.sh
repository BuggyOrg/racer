#!/bin/bash
rm /tmp/.X1-lock
xvfb-run --server-args="-screen 9 1280x2000x24" npm start
