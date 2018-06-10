#!/usr/bin/env bash
# first bump up package.json manually, commit and tag
rm superset/assets/dist/*
cd superset/assets/
yarn
yarn run build
cd ../..
python setup.py sdist
