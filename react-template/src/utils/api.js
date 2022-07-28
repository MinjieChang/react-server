let origin = typeof window === 'undefined' ? '' : window.location.origin

if (!origin || origin.indexOf('localhost') > -1) {
  origin = origin + '/gov'
}

const api = {
  origin: `${origin}`,
  // app
  uploadFile: `${origin}/api/g/fileUpload`,
}

module.exports = api
