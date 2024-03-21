"use strict";
var m3 = {
  projection: function(width, height) {
    /* Note: This matrix flips the Y axis so that 0 is at the top.
    return [
      2 / width, 0, 0,
      0, -2 / height, 0,
      -1, 1, 1
    ];*/
	return [
		1,  0, 0,
		0, -1, 0,
		width/2, height/2, 1
	];
  },
  
  copy: function(m) {
	return [
		m[0], m[1], m[2],
		m[3], m[4], m[5],
		m[6], m[7], m[8]
	];
  },
  
  identity: function() {
	return [
		1, 0, 0,
		0, 1, 0,
		0, 0, 1
	];
  },
  
  translation: function(tx, ty) {
    return [
      1, 0, 0,
      0, 1, 0,
      tx, ty, 1
    ];
  },
  
  rotation: function(angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);
    return [
       c, s, 0,
      -s, c, 0,
       0, 0, 1
    ];
  },
  
  scaling: function(sx, sy) {
    return [
      sx, 0, 0,
      0, sy, 0,
      0, 0, 1
    ];
  },
  
  multiply: function(a, b) {
	var a00 = a[0 * 3 + 0];
	var a01 = a[0 * 3 + 1];
	var a02 = a[0 * 3 + 2];
	var a10 = a[1 * 3 + 0];
	var a11 = a[1 * 3 + 1];
	var a12 = a[1 * 3 + 2];
	var a20 = a[2 * 3 + 0];
	var a21 = a[2 * 3 + 1];
	var a22 = a[2 * 3 + 2];
	var b00 = b[0 * 3 + 0];
	var b01 = b[0 * 3 + 1];
	var b02 = b[0 * 3 + 2];
	var b10 = b[1 * 3 + 0];
	var b11 = b[1 * 3 + 1];
	var b12 = b[1 * 3 + 2];
	var b20 = b[2 * 3 + 0];
	var b21 = b[2 * 3 + 1];
	var b22 = b[2 * 3 + 2];
 
	return [
	  b00 * a00 + b01 * a10 + b02 * a20,
	  b00 * a01 + b01 * a11 + b02 * a21,
	  b00 * a02 + b01 * a12 + b02 * a22,
	  b10 * a00 + b11 * a10 + b12 * a20,
	  b10 * a01 + b11 * a11 + b12 * a21,
	  b10 * a02 + b11 * a12 + b12 * a22,
	  b20 * a00 + b21 * a10 + b22 * a20,
	  b20 * a01 + b21 * a11 + b22 * a21,
	  b20 * a02 + b21 * a12 + b22 * a22
	];
  },
  
  translate: function(m, tx, ty) {
    return m3.multiply(m, m3.translation(tx, ty));
  },

  rotate: function(m, angleInRadians) {
    return m3.multiply(m, m3.rotation(angleInRadians));
  },

  scale: function(m, sx, sy) {
    return m3.multiply(m, m3.scaling(sx, sy));
  },
  
  transform: function(v, m) {
	return [
	  v[0]*m[0] + v[1]*m[3] + v[2]*m[6],
	  v[0]*m[1] + v[1]*m[4] + v[2]*m[7],
	  v[0]*m[2] + v[1]*m[5] + v[2]*m[8]
	];
  }
}

function MatrixStack() {
  this.stack = [];
  // since the stack is empty this will put an initial matrix in it
  this.restore();
}

// Gets a copy of the current matrix (top of the stack)
MatrixStack.prototype.getCurrentMatrix = function() {
  return this.stack[this.stack.length - 1].slice();
};

// Lets us set the current matrix
MatrixStack.prototype.setCurrentMatrix = function(m) {
  this.stack[this.stack.length - 1] = m;
  return m;
};

// Pushes a copy of the current matrix on the stack
MatrixStack.prototype.save = function() {
  this.stack.push(this.getCurrentMatrix());
};

// Pops the top of the stack restoring the previously saved matrix
MatrixStack.prototype.restore = function() {
  this.stack.pop();
  // Never let the stack be totally empty
  if (this.stack.length < 1) {
    this.stack[0] = m3.identity();
  }
};

/***
// Translates the current matrix
MatrixStack.prototype.translate = function(x, y, z) {
  if (z === undefined) {
    z = 0;
  }
  var m = this.getCurrentMatrix();
  this.setCurrentMatrix(m4.translate(m, x, y, z));
};

// Rotates the current matrix around Z
MatrixStack.prototype.rotateZ = function(angleInRadians) {
  var m = this.getCurrentMatrix();
  this.setCurrentMatrix(m4.zRotate(m, angleInRadians));
};

// Scales the current matrix
MatrixStack.prototype.scale = function(x, y, z) {
  if (z === undefined) {
    z = 1;
  }
  var m = this.getCurrentMatrix();
  this.setCurrentMatrix(m4.scale(m, x, y, z));
};
***/