function createHeadings (dates) {
  const headings = {
    monthly: `Open Source Engineering Report: Monthly Run at ${dates.now}`,
    weekly: `Open Source Engineering Report: Weekly Run at ${dates.now}`
  }

  return headings
}

module.exports = createHeadings
