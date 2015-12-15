var Style = require('../src');
// var style = new Style("test");
// style.add({
//     "body": {
//         "background-color": "#ccc",
//         "width": "10px",
//         "height": "100px"
//     }
// });

// style.add({
//     "body": {
//         "background-color": "red"
//     }
// })
var StyleSheet = require('react-style')

var styles = StyleSheet.create({
    foo: {
      color: 'red',
      backgroundColor: 'white'
    }
});

console.log(styles);

var str = StyleSheet.compile(100);

console.log(str);
