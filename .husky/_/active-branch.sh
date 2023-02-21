#!/usr/bin/env sh

echo "
Skip pre-commit hooks with --no-verify (not recommended)."
BRANCH=`git rev-parse --abbrev-ref HEAD`
if [ "$BRANCH" = "master" ]; 
then
  echo "You are on branch $BRANCH. You must not commit to master."
  exit 1
fi

if [ "$BRANCH" = "dev" ]; 
then
  echo "Please, do not commit code to develop\n"
  exit 1
fi

  