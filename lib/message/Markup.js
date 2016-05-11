function Markup(height) {
  if (height > 2080) throw 'Rich Message canvas\'s height should be less than or equals 2080px';

  this.canvas = {
    height: height,
    width: 1040,
    initialScene: 'scene1'
  };
  this.images = {
    image1: {
      x: 0,
      y: 0,
      w: 1040,
      h: height
    }
  };
  this.actions = {};
  this.scenes = {
    scene1: {
      draws: [{
        image: 'image1',
        x: 0,
        y: 0,
        w: 1040,
        h: height
      }],
      listeners: []
    }
  };
}

Markup.prototype.setAction = function(actionName, text, linkUri, type) {
  var obj = { type: type || 'web' };

  switch(type) {
    case 'sendMessage':
      obj.params = { text: text };
      break;
    default:
      obj.text = text;
      obj.params = { linkUri: linkUri };
      break;
  }

  this.actions[actionName] = obj;

  return this;
};

Markup.prototype.addListener = function(actionName, x, y, width, height) {
  this.scenes.scene1.listeners.push({
    type: 'touch',
    params: [x, y, width, height],
    action: actionName
  });

  return this;
};

Markup.prototype.build = function() {
  return JSON.stringify(this);
};

module.exports = Markup;
