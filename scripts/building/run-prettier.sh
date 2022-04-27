#!/bin/bash

ARGS=$(git diff --name-only --diff-filter d | grep "\.ts$" | xargs)

if [[ "$ARGS" != "" ]]
then
    PRETTIER_OPERATION_MODE=$1

    npx prettier "$PRETTIER_OPERATION_MODE" "$ARGS"
fi
