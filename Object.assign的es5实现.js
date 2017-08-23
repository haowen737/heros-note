let a = {aa: 11}
let b = {bb: 22, cc: 33}

function myass (target) {
    let source = arguments
    for (let i = 0; i < source.length; i++) {
        for (let key in source[i]) {
            target[key] = !target.hasOwnProperty(arguments[key]) && source[i][key]
        }
    }
    return target
}
// a = Object.assign(a, b)
// console.log(a)
let c = myass({}, a, b)

console.log(a, c)
