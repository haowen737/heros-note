(function (root, factory) {
  factory(root.Haowen = {})
})(this, function (exports) {
  exports.http = {
    options: {
      contentType: 'application/plain',
      data: null,
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        // 'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
        'Content-Encoding': 'gzip'
      },
      // dataType : "jsonp",
      method: 'GET',
      onerror: function() {},
      onload: function() {},
      onreadystatechange: function() {},
      url: './'
    },
    get: function (url, option, resolve, reject) {
      return this.request(url, option, resolve, reject)
    },
    request: function (url, data, resolve, reject) {
      return new Promise((resolve, reject) => {
        let req
        let opt = this.mergeOption(url, data)
        if (window.XMLHttpRequest) {
          req = new XMLHttpRequest()
          if (req.overrideMimeType) {
            req.overrideMimeType('text/xml')
          }
        }
        else if (window.ActiveXObject) { // IE
          try {
            req = new ActiveXObject("Msxml2.XMLHTTP")
          }
          catch (e) {
            try {
              req = new ActiveXObject("Microsoft.XMLHTTP")
            }
            catch (e) {}
          }
        }

        if (!req) {
          alert('请更换高版本浏览器')
          return false
        }
        req.open(opt.method, opt.url)
        // for (var key in opt.headers) {
        //   if (opt.headers.hasOwnProperty(key)) {
        //     console.log(key, opt.headers[key])
        //     req.setRequestHeader(key, opt.headers[key])
        //   }
        // }
        req.send(opt.data)

        req.onreadystatechange = function () {
          if (req.readyState === 4) {
            return req.response ? resolve(req.response) : reject('请求失败')
          }
        }
      })
    },
    getURL (url, data) {
      if (data instanceof Object) {
        url += (url.indexOf('?') === -1 ? '?' : '&') + this.encodeParams(data)
      }
      return url
    },
    encodeParams (data) {
      let str = ''
      for (key in data) {
        str += key.toString() + '=' + data[key].toString() + '&'
      }
      return str.slice(0, -1)
    },
    mergeOption (url, data) {
      let merged = {}
      let def = this.options
      for (key in def) {
        merged[key] = def[key]
      }
      merged.url = this.getURL(url, data)
      return merged
    }
  }
})
