# fetch-activity

## Usage

Currently WIP, so the following instructions assume you're writing a file in the root of the repo (rather than installing from npm):

**local.js:**

```js

const fetchActivity = require('./index')

const githubUsernames = ['bnb'] // whatever you want


async function logging () {
  const data = await fetchActivity.forUsers(teamMembersArray)

  await console.log(await markdownify(data))
}

logging()
```

**.env:**

```bash
GITHUB_PAT=<your github Personal Access Token here>
```
