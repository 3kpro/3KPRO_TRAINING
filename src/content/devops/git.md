# Master Class: Version Control with Git

Git is not just a tool; it's a distributed filesystem with a version control system built on top. To master Git, you must understand the **Three Trees** and the **Plumbing vs. Porcelain** architecture.

## 1. The Git Architecture (Three Trees)

Understanding how files move through Git is fundamental to avoiding merge conflicts and data loss.

| Area | Component | Description |
| :--- | :--- | :--- |
| **Working Directory** | Sandbox | The actual files on your disk. Changes here are "untracked" or "modified". |
| **Staging Area (Index)** | The "Next Commit" | A single file that stores information about what will go into your next snapshot. |
| **Git Directory (Repository)** | The Database | Where Git stores the object database and metadata for your project. |

---

## 2. Command Breakdown: The "Big Four"

### `git add <file>`
**What it actually does:** It takes the content of the file, hashes it, stores it as a *blob* object in the `.git/objects` directory, and updates the *Index* (Staging Area).

### `git commit -m "msg"`
**What it actually does:** 
1. Creates a *tree* object representing the project root.
2. Creates a *commit* object containing the tree hash, parent hash, author, and timestamp.
3. Moves the `HEAD` pointer of the current branch to this new commit hash.

---

## 3. Advanced Branching & Merging

### Fast-Forward vs. Three-Way Merge
- **Fast-Forward:** Occurs when the target branch has no new commits. Git simply moves the pointer forward.
- **Three-Way Merge:** Occurs when branches have diverged. Git creates a new "Merge Commit" using a common ancestor.

### Command Structure Breakdown: `git rebase`
Rebase re-writes history by applying your commits on top of another base.

```bash
# Visual Breakdown of Rebase
git checkout feature
git rebase main

# 1. Finds common ancestor of feature and main.
# 2. Temporarily saves feature commits.
# 3. Resets feature branch to main.
# 4. Applies feature commits one by one on top of main.
```

---

## 4. Master Level Workflow: The "Perfect" Commit
A master developer never uses `git add .`. They use **Interactive Staging**.

```bash
git add -p
```
*This allows you to review every single "hunk" of code change and decide if it belongs in the current commit or the next one.*

## 5. Summary Checklist
- [ ] Do you understand the difference between `git fetch` and `git pull`? (Fetch updates refs; Pull fetches AND merges).
- [ ] Can you recover a deleted commit? (Use `git reflog`).
- [ ] Is your `.gitignore` configured for your specific IDE?
