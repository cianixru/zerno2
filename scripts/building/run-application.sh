#!/bin/bash

APPLICATION=$1
APPLICATION_PATH="applications/$APPLICATION"

# shellcheck disable=SC2164
cd ".result/$APPLICATION_PATH/"

node --experimental-specifier-resolution=node main.js
