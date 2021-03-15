async function getEntriesOfType (githubEventType, githubUserData) {
  const dataToReturn = []

  for (const entry in githubUserData) {
    if (entry.type === githubEventType) {
      dataToReturn.push(entry)
    }
  }

  return dataToReturn
}
module.exports = getEntriesOfType
