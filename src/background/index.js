const browser = window.msBrowser || window.browser || window.chrome
const LUNES_DOMAIN_REGEX = /(luneswallet\.app)/
const LUNES_DOMAIN       = 'https://luneswallet.app'

function Print() {}
Print.body = function(args, type) {
  if (args.constructor.name === 'Array')
    args = args.map(arg => !arg ? arg : arg.constructor.name === 'Object' ? JSON.stringify(arg,null,2) : arg)
  let css = type == 'success'
  ? 'background:lightgreen; color:black;font-weight:bold;font-size: 20px;' : type == 'warn'
  ? 'background:orange; color:black;font-weight:bold;font-size: 20px;'     : type == 'error'
  ? 'background:indianred; color:black;font-weight:bold;font-size: 20px;'  : type == 'info'
  ? 'background:dodgerblue; color:black;font-weight:bold;font-size: 20px;' : ''

  args.constructor.name === 'String'
  ? console.log(`%c${args}`,css) : args.constructor.name === 'Array'
  ? console.log(`%c${[...args]}`,css) : console.log(`%c${[...args]}`,css)
}
Print.success = function(args) { Print.body(args, 'success') }
Print.info    = function(args) { Print.body(args, 'info') }
Print.warn    = function(args) { Print.body(args, 'warn') }
Print.error   = function(args) { Print.body(args, 'error') }


function ConnectionClass() {
  this.port
  let self = this
  browser.runtime.onConnect.addListener((port) => {
    // port.postMessage({type:'class', class: User})
    console.log('port', port)
    self.port = port
  })
}
ConnectionClass.prototype.postUserInfo = function() {
  this.port.postMessage({ type:'object',class: User })
}
const Connection = new ConnectionClass()


function UserClass() {
  this.hasCookie;
  this.cookieData;
  this.cookieValue;
  this.user;
}
UserClass.prototype.setCookie = function(param) {
  let self = this
  return new Promise(function(resolve, reject) {
    if (param) {
      if (!param.value) {
        Print.error('UserClass.setCookie: param\'s value is a falsy value')
        reject(false) }
      self.cookieData  = param
      self.cookieValue = param.value.constructor.name === 'Object' ? param.value : JSON.stringify(param.value)
      resolve(true)
    }
    browser.cookies.get({ url: LUNES_DOMAIN, name: 'user' }, cookie => {
      if (!cookie) {
        reject(false);
      }
      self.cookieData = cookie
      self.cookieValue = JSON.parse(cookie.value)
      resolve(true)
    })
  })
}
UserClass.prototype.isLoggedIn = function() {

}
UserClass.prototype.login = function() {
  return new Promise((resolve, reject) => {
    let cookieValue = this.cookieValue
    if (!cookieValue)
      reject('User cookie is a falsy value')
    if (cookieValue.constructor.name !== 'Object')
      reject('User cookie is not an object')
    this.user = cookieValue
    browser.storage.sync.set({user: cookieValue}, function(info) {
      Print.success('User is logged in')
      resolve('User is logged in')
    })
  })
}
const User = new UserClass()
User.setCookie()
.then(r => Promise.resolve(User.login()))
.then(r => { Connection.postUserInfo() })
.catch(e => { console.error(e) })



// LISTENERS
browser.cookies.onChanged.addListener(function(info){
  let { removed } = info
  let { domain, name, value } = info.cookie
  if (removed)
    return
  if (domain.search(LUNES_DOMAIN_REGEX) === -1)
    return
  if (name !== 'user')
    return
  if (!value) {
    Print.error('User cookie is not valid got: \''+value+'\'')
    return; }
  let obj;
  try { obj = JSON.parse(value) } catch(err) { throw new Error('Couldnt parse value') }
  User.setCookie({ ...info.cookie, value: obj })
  .then(r => { User.login() })
  .catch(e => { Print.error(e) })
})
