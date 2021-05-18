const { session } = require('electron')

// Modify the user agent for all requests to the following urls.
const filter = {
  urls: ['*://*/*']
}

session.defaultSession.webRequest.onBeforeRequest(filter, (details, callback) => {
  console.log('details: ', details.url)
  if (details.url === 'https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg') {
    callback({ redirectURL: 'https://dss1.bdstatic.com/5aAHeD3nKgcUp2HgoI7O1ygwehsv/media/ch1000/png/导航List_天猫.png' })
  } else {
    callback({ })
  }
})
