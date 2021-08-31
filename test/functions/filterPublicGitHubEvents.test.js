const { getPublicGitHubEvents, filterPublicGitHubEvents } = require('../../')
const users = require('../util/people')

async function test () {
  // Fetch raw data with a request to GitHub. This is required to filter the data, since there's nothing to filter if we don't have the data.
  const rawData = await getPublicGitHubEvents(users)
  // Applys our filters to the data we get from GitHub and makes it "useful" while also stripping away what we don't need.
  const data = await filterPublicGitHubEvents(rawData)

  console.log(data)
}

test()
