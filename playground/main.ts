import fluent from 'virtual:fluent/langs/all'

fluent.en()?.then(({ default: bundle }) => {
  const value = bundle.getMessage('username')?.value
  if (value) {
    document.getElementById('app')!.innerHTML = bundle.formatPattern(value, { username: 'james_bond', firstName: 'James' })
  }
})
