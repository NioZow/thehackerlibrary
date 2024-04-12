package update

import (
	git "github.com/go-git/go-git/v5"
)

// update the yml files by pulling the repo
func Update() error {

	// init the git repo
	r, err := git.PlainClone("https://github.com/NioZow/thehackerlibrary", false, &git.CloneOptions{URL: "https://github.com/NioZow/thehackerlibrary"})
	if err != nil {
		return err	
	}

	// get the worktree
	w, err := r.Worktree()
	if err != nil {
		return err
	}

	err = w.Pull(&git.PullOptions{RemoteName: "origin"})
	return err
}