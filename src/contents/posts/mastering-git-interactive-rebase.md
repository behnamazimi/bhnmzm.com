---
title: 'Mastering Git Interactive Rebase: Tips for Editing Commits'
description: 'Git interactive rebase is a way to edit commits in the past. It allows you to choose specific commits to edit, squash, reorder, and delete. And here are some useful tips about git interactive rebase.' 
order: 60
created_at: '2023-01-27T08:00:36.854Z'
updated_at: ''
image: 'https://raw.githubusercontent.com/behnamazimi/pstrg/master/bhnmzm/wizard.jpeg'
---

## What is git rebase for?

Git interactive rebase is a way to edit commits in the past. It allows you to choose specific commits to edit, squash, reorder, and delete.

## Tips:

- To start an interactive rebase, use the command "git rebase -i HEAD~[number of commits to go back]".

- You can also use "git rebase -i [commit hash]" to specify a specific commit to start the rebase from, instead of using "HEAD~[number of commits]".

- You can use "git rebase -i [branch name]" when you are working with branches, this way you can make sure you are only modifying the commits of the branch you want to modify.

- Use "git stash" before starting an interactive rebase, in case you need to abort the rebase and want to get back to your previous state.

- Since 2015, you can use `fixup` to combine the changes of a commit with the previous commit.

- If you're working with a remote repository, it's better to use "git pull --rebase" instead of git pull to avoid conflicts when you update your local repository.

- Don't stress if you make a mistake during a rebase, you can utilize "git reflog" to undo the changes by going back in time 😮


I also suggest you read the [Git Pro book](https://git-scm.com/book/en/v2).

The cover image was created by deepai.org based on this text: "Git wizard with a long staff in her hand" 😁 🧙‍♂️