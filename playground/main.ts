import bundleMap from 'virtual:fluent/langs/all'

if (!bundleMap.has('en')) {
  throw new Error('Language not found')
}

bundleMap.get('en')!().then(({ default: bundle }) => {
  const value = bundle.getMessage('login-button')?.value
  if (value) {
    document.getElementById('app')!.innerHTML = bundle.formatPattern(value, { username: 'james_bond', firstName: 'James' })
  }
})
