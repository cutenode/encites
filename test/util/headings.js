function createHeadings (dates) {
  const headings = {
    monthly: `Personal GitHub Activity Report: Monthly Run at ${dates.now}`,
    weekly: `Personal GitHub Activity Report: Weekly Run at ${dates.now}`
  }

  return headings
}

module.exports = createHeadings
