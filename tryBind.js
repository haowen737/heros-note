this.dogname = 'dog00'
const dog33 = {
    dogname: 'dog33'
}
function funcc1 () {
    this.dogname = 'dog11'
}
function funcc2 () {
    console.log(this.dogname)
}

// funcc1()
// funcc2.bind(funcc1())();
funcc2.bind(funcc1())();
funcc2.call(funcc1(), dog33);
funcc2.call(funcc1);

// var animals = [
//   {species: 'Lion', name: 'King'},
//   {species: 'Whale', name: 'Fail'}
// ];

// for (var i = 0; i < animals.length; i++) {
//   (function (i) { 
//     this.print = function () { 
//       console.log('#' + i  + ' ' + this.species + ': ' + this.name); 
//     } 
//     this.print();
//   }).call(animals[i], i);
// }

// for (var i = 0; i < animals.length; i++) {
//     (function (i) {
//         console.log('#' + i  + ' ' + this.species + ': ' + this.name)
//     }).call(animals[i], i)
// }