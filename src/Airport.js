function Airport(capacity=10) {
  this._planes = [];
  this.capacity = capacity;
}

Airport.prototype.land = function(plane) {
  if (this.weatherReport() === 'stormy') {
    throw new Error('Unable to land, stormy...')
  } else if (this._planes.length >= this.capacity) {
    throw new Error('Unable to land, full...')
  } else {
    console.log(this.weatherReport())
    this._planes.push(plane);
  }
}

Airport.prototype.takeoff = function(plane) {
  if (this.weatherReport() === 'stormy') {
    throw new Error('Unable to takeoff, stormy...')
  } else {
    console.log(this.weatherReport())
    this._planes.pop();
  }
}

Airport.prototype.weatherReport = function() {
  arr = ['sunny', 'stormy'];
  return arr[Math.floor(Math.random() * arr.length)];
}
