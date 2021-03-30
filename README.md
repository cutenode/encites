# Encites

Encites is a WIP project to enable folks to collect and process public GitHub activity data about users. Sorry if anything's broken, I might fix it if you create an issue.

## Usage

```bash
npm install encites
```

### Preface

There are a few things you'll need:

- Data directory: You'll need a data directory. Regardless of what you name this directory, almost all operations of encites assume you have one. Encites will try to create one for you if one doesn't already exist when you're running some commands, but does not gaurantee that it'll succeed.
- Megafile name: Since GitHub only returns 30 days or 300 results (whichever is less), Encites provides some functionality that can help you build a cache of all events if you run it often enough (how often is often enough depends on how active any given user is). In the project, this is considered a `megafile` and can be thought of as a kind of cache. To use certain kinds of functionality, you'll need to choose a name for your megafile and keep it consistent. `megafile.json` is a good default.

Some additional terms and context around them:

- Events: Events are the primordial that Encites gets from GitHub. Encites manipulates the Event objects it gets from GitHub through `getPublicGitHubEvents`, and can use `filterPublicGitHubEvents` to be more compact, only surfacing information that are useful for accomplishing the goals of Encites.
- Events Array: An array that contains individual Events.
- Events File: A file that contains an Events Array. Generally, written by one of the helper methods.
- Data Directory: The directory where your JSON output files go.

### Environment Variables

Encites uses [dotenv](https://www.npmjs.com/package/dotenv) to read environment variables from a `.env` file in your project. If you'd prefer not to use a `.env` file, you can define your environment variables in your operating system through normal methods.

#### `ENCITES_GITHUB_PAT`

This is expected to be assigned the value of a GitHub Personal Access Token (GitHub PAT, see [GitHub's docs](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) for details on how to create one). This is needed to ensure you don't get rate limited, which will almost certainly happen when using Encites without a PAT.

#### `ENCITES_LOGGER`

If this is assigned the value of `true`, you will get pretty log output from [pino](https://npm.im/pino). You can use [pino-pretty](http://npm.im/pino-pretty) to prettily view them in your terminal.

### Methods

#### dedupeLocalEventsFilesInDirectory(dataDirectory)

A utility in the pursuit of building megafiles. It will retrun a deduped array of all entires from entries files in the passed directory.

* `dataDirectory` (string, required): path to your data directory to step through for events files (Encites presumes that _all_ files in that data directory are events files).

```js
const { dedupeLocalEventsFilesInDirectory } = require('encites')

const directory = './data/`

// get all data, deduped, from your data directory
const dedupedData = await dedupeLocalEventsFilesInDirectory(`${directory}`)

console.log(dedupedData)
```
#### filterPublicGitHubEvents(events)

Parses data from the GitHub API, provided to the method via the `events` property, and returns a nice clean array of objects representing events with only relevant information.

* `events` (array, required): an array of GitHub API response data.

```js
const { filterPublicGitHubEvents, getPublicGitHubEvents } = require('encites')

const arrayOfGitHubUsers = ['bnb']

// get our GitHub data - make sure you've already set ENCITES_GITHUB_PAT
const publicEvents = await getPublicGitHubEvents(arrayOfGitHubUsers)

// filter our data into the shape the rest of the module expects
const events = await filterPublicGitHubEvents(publicEvents)
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

#### getMarkdownFromEvents(events, title)

Takes an Events Array, spits out pretty markdown.

* `events` (array, required): An array of Events.
* `title` (string, required): A string to be used as the title of your Markdown document.

```js
const { filterPublicGitHubEvents, getMarkdownFromEvents getPublicGitHubEvents } = require('encites')

// the users we're getting data for
const users = ['bnb']

// fetch new data from GitHub - make sure you've already set ENCITES_GITHUB_PAT
const publicEvents = await getPublicGitHubEvents(users)

// structure our data in the shape we need
const events = await filterPublicGitHubEvents(users)

// get a markdown representation of our Events
const markdown = await getMarkdownFromEvents(events)
``` 

#### getPublicGitHubEvents(githubUsernames)

Fetches data from the GitHub API. Only fetches public data, zero authenticated/private data is fetched. 

You can either directly pass this along to something that consumes it, or you can write it to a file. Writing it to a file has the benefit of being able to be consumed again later if you'd like to rebuild your data or if there are new Event parsing capabilities added to the module once you're past 90 days or 300 events.

* `githubUsernames` (string, required): An Array of GitHub usernames for whom you want to consume public data.

```js
const { filterPublicGitHubEvents, getPublicGitHubEvents } = require('encites')

const arrayOfGitHubUsers = ['bnb']

// get our GitHub data - make sure you've already set ENCITES_GITHUB_PAT
const publicEvents = await getPublicGitHubEvents(arrayOfGitHubUsers)

// filter our data into the shape the rest of the module expects
const events = await filterPublicGitHubEvents(publicEvents)
```

#### writeEventsFile(dataDirectory, events, options)

Writes an Events File to the passed Data Directory with the passed Events Array. By default, the filename is the current date in `yyyy-mm-dd` format, but you can overwrite that with options. Doing so is useful for writing megafiles.

* `dataDirectory` (string, required): the path to your data directory, where an Events File will be written to.
* `events` (array, required): Pass in an Event Array to be written to the provided path.
* `options` (object, optional):
  * `filename` (string, optional): The name of the file. Useful for writing megafiles.

```js
const { filterPublicGitHubEvents, getPublicGitHubEvents, writeEventsFile } = require('encites')

// path to write all our files to.
  const dataPath = './data/'

// array of users we'd like data for
const users = ['bnb']

const publicEvents = await getPublicGitHubEvents(users)

// fetches public data from  the GitHub API
const events = await filterPublicGitHubEvents(publicEvents)

// write single instance of data
writeEventsFile(`${dataPath}`, events)
```

#### writeMarkdownFile(markdownPath, markdownFileName, events, title)

A relatively straightforward wrapper of [`getMarkdownFromEvents()`](#getmarkdownfromeventsevents) to write events out as a pretty Markdown file to a provided path with a provided filename.

- `markdownPath` (string, required): The _full path_ to which you want the markdown file to be written. Does not include filename.
- `markdownFileName` (string, required): The filename, including extension, that you want your resulting markdown to be written as.
- `events` (array, required): An array of Events that you'd like to be parsed out into Markdown.
- `title` (string, required): A string to be used as the title of your Markdown document.

```js
const { filterPublicGitHubEvents, getPublicGitHubEvents, writeMarkdownFile } = require('encites')

// in this case, we're fine with our markdown file being in the root 
const markdownPath = './'
const markdownFilename = 'output.md'

// the usernames we want public data for
const users = ['bnb']

// fetch the public data - make sure you've already set ENCITES_GITHUB_PAT
const publicEvents = await getPublicGitHubEvents(users)

// fetches public data from  the GitHub API
const events = await getAndFilterPublicGitHubEvents(publicEvents)

// write single instance of data
writeMarkdownFile(markdownPath, markdownFileName, events)
```
#### writemegafile(dataPath, megafileFileName)

A tiny wrapper over [`writeEventsFile()`](#writeeventsfiledatadirectory-events-options) to simplify writing megafiles. Writes a megafile to the data directory.

- `dataPath` (string, required): the path to your data directory. 
- `megafileFileName` (string, required): the name of your megafile. `megafile.json` is a good choice.

```js
const { writeMegafile } = require('encites')

// data directory that we write all our files to
const dataPath = './data/'

// name of the megafile. Can be whatever, I've just chosen megafile. Needs to be `.json`.
const megafileName =  'megafile.json'

// write our megafile to the data directory
writeMegafile(dataPath, megafileName)
```

## Appendix A: Object Shapes

### Event Object

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