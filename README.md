# Encites

Encites is a WIP project to enable folks to collect and process public GitHub activity data about users. Sorry if anything's broken, I might fix it if you create an issue.

## Usage

```bash
npm install encites
```

### Preface

There are a few things you'll need:

- GitHub Personal Access Token: You'll need this if you plan to be using `getFilteredPublicUserData`, which is foundational for using Encites. Encites expects to consume this from a `ENCITES_GITHUB_PAT` environment variable, which can be set manually or via a `.env` file in your project, courtesy of our usage of [dotenv](https://www.npmjs.com/package/dotenv).
- Data directory: You'll need a data directory. Regardless of what you name this directory, almost all operations of encites assume you have one. Encites will not create one for you.
- Megafile name: Since GitHub only returns 30 days or 300 results (whichever is less), Encites provides some functionality that can help you build a cache of all events if you run it often enough (how often is often enough depends on how active any given user is). In the project, this is considered a `megafile` and can be thought of as a kind of cache. To use certain kinds of functionality, you'll need to choose a name for your megafile and keep it consistent. `megafile.json` is a good default.

Some additional terms and context around them:

- Events: Events are the primordial that Encites gets from GitHub. Encites manipulates the Event objects it gets from GitHub through `getAndFilterPublicGitHubEvents` to be more compact, only surfacing information that are useful for accomplishing the goals of Encites.
- Events Array: An array that contains individual Events.
- Events File: A file that contains an Events Array. Generally, written by one of the helper methods.

### Methods

#### dedupeLocalEventsFilesInDirectory(dataDirectory, megafileName)

A utility in the pursuit of building megafiles. It will retrun a deduped array of all entires from entries files in the passed directory.

* `dataDirectory` (string, required): path to your data directory to step through for events files (Encites presumes that _all_ files in that data directory are events files, excluding the single file passed as `megafileName`).
* `megafileName` (string, optional): name of your megafile, including file extension, to be ignored.

```js
const { dedupeLocalEventsFilesInDirectory } = require('encites')

const directory = './data/`
const megafileName = 'megafile.json'

const dedupedData = dedupeLocalEventsFilesInDirectory(`${directory}`)
const dedupedDataExcludingMegafile = dedupeLocalEventsFilesInDirectory(`${directory}${megafileName}`)

console.log(dedupedData) // get all data, deduped, from your data directory

```
#### getFilteredPublicUserData(githubUsernames)

Fetches data from the GitHub API. Only fetches public data, zero authenticated/private data is fetched.

* `githubUsernames` (string, required): An Array of GitHub usernames for whom you want to consume public data.

```js
const { getFilteredPublicUserData } = require('encites')

const arrayOfGitHubUsers = ['bnb']

// make sure you've already set ENCITES_GITHUB_PAT
getFilteredPublicUserData(arrayOfGitHubUsers)
```

#### getEventsFrom

`getLocalEventsFrom()` has two exposed methods - `date` and `period`. These respectively allow you to **filter** events contained within events files, based on date/time information.

##### getEventsFrom.date(eventsFile, startDate)

Gets all events, starting after the date passeed.

* `eventsFile` (string, required): Path to an events file. You'll probably want to read a megafile rather than any given single events file. 
* `startDate` (string, required): The starting date. Any events before this date will be excluded from the results. Accepts any value that is valid in Luxon's [.toISO()](https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-toISO) method.

```js
const { getEventsFrom } = require('encites')

const dataPath = './data/'
const megafileName =  'megafile.json'
const users = ['bnb']

const dateToCheckFrom = '2021-03-01' // yyyy-mm-dd

const dateFilteredEvents = await getLocalEventsFrom.date(`${dataPath}${megafileName}`, dateToCheckFrom)
```

##### getEventsFrom.period(eventsFile, startDate, endDate)

Get all events within a given period.

* `eventsFile` (string, required): Path to an events file. You'll probably want to read a megafile rather than any given single events file.
* `startDate` (string, required): The starting date. Any events before this date will be excluded from the results. Accepts any value that is valid in Luxon's [.toISO()](https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-toISO) method.
* `endDate` (string, required): The ending date. Any events after this date will be excluded from the results. Accepts any value that is valid in Luxon's [.toISO()](https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-toISO) method.


```js
const { getEventsFrom } = require('encites')

const dataPath = './data/'
const megafileName =  'megafile.json'
const users = ['bnb']

const dateToCheckFrom = '2021-03-01' // yyyy-mm-dd
const dateToCheckUntil = '2021-03-28' // yyyy-mm-dd

const dateFilteredEvents = await getLocalEventsFrom.period(`${dataPath}${megafileName}`, dateToCheckFrom, dateToCheckUntil)
```

#### getMarkdownFromEvents(events)

Takes an Events Array, spits out pretty markdown.

* `events` (Array, required): An array of Events.

```js
const { getMarkdownFromEvents, getFilteredPublicUserData } = require('encites')

// the users we're getting data for
const arrayOfGitHubUsers = ['bnb']

// make sure you've already set ENCITES_GITHUB_PAT
const dataFromGitHub = getFilteredPublicUserData(arrayOfGitHubUsers)

// get a markdown representation of our Events
const markdown = await getMarkdownFromEvents(dataFromGitHub)
```

#### writeEventsFile(dataDirectory, eventsToWrite, options)

Writes an Events File to the passed Data Directory with the passed Events Array. By default, the filename is the current date in `yyyy-mm-dd` format, but you can overwrite that with options. Doing so is useful for writing megafiles.

* `dataDirectory` (string, required): the path to your data directory, where an Events File will be written to.
* `eventsToWrite` (Array, required): Pass in an Event Array to be written to the provided path.
* `options` (object, optional):
  * `filename` (string, optional): The name of the file. Useful for writing megafiles.

```js
const { getAndFilterPublicGitHubEvents, writeEventsFile } = require('encites')

// path to write all our files to.
  const dataPath = './data/'

// fetches public data from  the GitHub API
const data = await getAndFilterPublicGitHubEvents(users)

// write single instance of data
writeEventsFile(`${dataPath}`, data)
```

### Appendix A: Object Shapes

#### Event Object

An event object has a relatively specific structure. This structure is based on which `type` of event the Event Object is representing. These structures are built out in `./lib/getAndFilterPublicGitHubEvents.js`. Here's a reference for each kind:

```json

// IssuesEvent
{
  "id": "15475051640",
  "type": "IssuesEvent",
  "author": "bnb",
  "repo": "cutenode/delice",
  "title": "f",
  "link": "https://github.com/cutenode/delice/pull/8",
  "number": 8,
  "date": "2021-03-10T00:27:37Z",
  "action": "opened"
},

// PullRequestEvent
{
  "id": "15506478969",
  "type": "PullRequestEvent",
  "author": "bnb",
  "repo": "openjs-foundation/cross-project-council",
  "title": "doc: add README.md file to /TRAVEL_FUND",
  "link": "https://github.com/openjs-foundation/cross-project-council/pull/727",
  "number": 727,
  "date": "2021-03-11T16:27:38Z",
  "action": "opened"
}
```