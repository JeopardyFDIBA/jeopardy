#!/usr/bin/env sh
local_branch_name="$(git rev-parse --abbrev-ref HEAD)"

valid_branch_regex="(feat|test|fix)(\(jeopardy\-(FE|BE)\))(\/)(\s*[a-zA-Z0-9]+).*$"

message="ERROR !
Your commit was rejected - incorrect branch name.
Branch names in this project must adhere to this contract: 
{feat|fix|hotfix|test}({project-name}-{FE|BE}): {ticket-description}. 
Example: feat(jeopardy-FE)- this is new feat
You should rename your branch and try again."

if [[ ! $local_branch_name =~ $valid_branch_regex ]]; then
    echo "$local_branch_name"
    echo "$message"
    exit 1
fi

exit 0