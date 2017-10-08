function getThen (obj) {
    try {
        return obj.then
    } catch (ex) {
        LAST_ERROR = ex
        return IS_ERROR
    }
}
function tryCallTwo (fn, a, b) {
    try {
        fn(a, b)
    } catch (ex) {
        LAST_ERROR = ex
        return IS_ERROR
    }
}

function Promise (fn) {
    this._state = 0
    doResolve(fn, this)
}

Promise.prototype.then = function () {
    // body...
}

function resolve (self, newValue) {
    let then = getThen(newValue)
    if (then === IS_ERROR) {
        return reject(self, LAST_ERROR)
    }
    if (
        then === self.then &&
        newValue instanceof Promise
    ) {
        self._state = 3
        self._value = newValue
        finale(self)
        return
    } else if (typeof then === 'function') {
        doResolve(then.bind(newValue), self)
        return
    }
    self._state = 1
    self._value = newValue
    finale(self)
}

function finale (self) {
    if (self._deferredState === 1) {
        handle(self, self._deferreds)
        self._deferredState = null
    }
    if (self._deferredState === 2) {
        for (var i = 0; i < self._deferreds.length; i++) {
            handle(self, self._deferreds[i])
        }
    }
}

function doResolve (fn, promise) {
    let done = false
    let res = tryCallTwo(fn, (value) => {
        if (done) return
        done = true
        resolve(promise, value)
    }, (reason) => {
        if (done) return
        done = true
        reject(promise, reason)
    })
    if (!done && res === IS_ERROR) {
        done = true
        reject(promise, LAST_ERROR)
    }
}

// let funcc = new Qromise((resolve, reject) => {

// })
// funcc.then((res) => {
//     console.log(res)
// })
