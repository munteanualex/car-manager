var blessed = require('blessed');

// Create a screen object.
var screen = blessed.screen();

// Create a box perfectly centered horizontally and vertically.
var box = blessed.box({
  top: 'center',
  left: 'center',
  width: '80%',
  height: '100%',
  content: 'Car Manager (v1.0.0)',
  align: 'center',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: '#ADD8E6',
    border: {
      fg: '#ffffff'
    },
    hover: {
      bg: 'green'
    }
  }
});
var form1 = blessed.form({
  parent: box,
  keys: true,
  left: 5,
  top: 5,
  width: 30,
  height: 4,
  bg: '#ADD8E6',
  content: 'Add a new car'
});
var form2 = blessed.form({
  parent: box,
  keys: true,
  left: 5,
  top: 10,
  width: 30,
  height: 4,
  bg: '#ADD8E6',
  content: 'Delete old car'
});

var addCar = blessed.button({
  parent: form1,
  mouse: true,
  keys: true,
  shrink: true,
  padding: {
    left: 1,
    right: 1
  },
  left: 3,
  top: 2,
  shrink: true,
  name: 'Add Car',
  content: 'Add Car',
  style: {
    bg: 'blue',
    focus: {
      bg: 'red'
    },
    hover: {
      bg: 'red'
    }
  }
});

var delCar = blessed.button({
  parent: form2,
  mouse: true,
  keys: true,
  shrink: true,
  padding: {
    left: 1,
    right: 1
  },
  left: 3,
  top: 2,
  shrink: true,
  name: 'Delete car',
  content: 'Delete car',
  style: {
    bg: 'blue',
    focus: {
      bg: 'red'
    },
    hover: {
      bg: 'red'
    }
  }
});

addCar.on('press', function() {
  form1.submit();
});

delCar.on('press', function() {
  form2.reset();
});

form1.on('Add new car', function(data) {
  form1.setContent('Submitted.');
  screen.render();
});

form2.on('Delete old car', function(data) {
  form.setContent('Deleted old car.');
  screen.render();
});

screen.key('q', function() {
  process.exit(0);
});

screen.render();


// Append our box to the screen.
screen.append(box);

// If our box is clicked, change the content.
box.on('click', function(data) {
  box.setContent('{center}Some different {red-fg}content{/red-fg}.{/center}');
  screen.render();
});

// If box is focused, handle `enter` and give us some more content.
box.key('enter', function() {
  box.setContent('{right}Even different {black-fg}content{/black-fg}.{/right}\n');
  box.setLine(1, 'bar');
  box.insertLine(1, 'foo');
  screen.render();
});

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

// Focus our element.
box.focus();

// Render the screen.
screen.render();
