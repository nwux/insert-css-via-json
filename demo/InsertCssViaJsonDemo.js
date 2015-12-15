var Style = require('../src');
var style = new Style("test");
style.add({
    "body": {
        "background-color": "#ccc",
        "width": "10px",
        "height": "100px"
    }
});

style.add({
    "body": {
        "background-color": "red"
    }
})