#!/bin/bash

APPLICATION=$1
APPLICATION_PATH="applications/$APPLICATION"

cp -r "$APPLICATION_PATH/.env/" ".result/$APPLICATION_PATH/"
cp -r "package.json" ".result/$APPLICATION_PATH/"

# shellcheck disable=SC2046
export $(cat ".result/$APPLICATION_PATH/.env/variables")

npx tsc-watch --onSuccess "scripts/building/run-application.sh $APPLICATION"
