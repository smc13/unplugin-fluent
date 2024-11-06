import { FluentBundle } from '@fluent/bundle'
import bundleMap from 'virtual:fluent/langs/all'

bundleMap.get('en')!().then(({ resources, language }) => {
  const bundle = new FluentBundle(language)
  for (const resource of resources) {
    bundle.addResource(resource)
  }

  const value = bundle.getMessage('login-button')?.value
  if (value) {
    document.getElementById('app')!.innerHTML = bundle.formatPattern(value, { username: 'james_bond', firstName: 'James' })
  }
}).catch(e => console.log(e))
