/**
 * This is a Least Recently Used Cache
 *
 * When the max size is reached, then the least recently used item is dropped.
 *
 * This is tracked by having a "use index", which is a number indicating how
 * recently a given item was accessed. The closer the "use index" is to
 * "mostRecent", the more recently is was used.
 *
 * When an item is accessed (via .get()) it's "use index" gets updated to be
 * the new "most recent".
 */

function LRUCache(maxSize) {
  this.maxSize = maxSize;
  this.size = 0;
  this.cache = {}; // key => val
  this.useIndex = {}; // use index => key
  this.useReverse = {}; // key => use index
  // this will be incremented to 0 for the first item added, making
  // leastRecent === mostRecent
  this.mostRecent = -1;
  this.leastRecent = 0;
}

/**
  * Get a value from the cache, returning undefined for an unknown key
  */
LRUCache.prototype.get = function(key) {
  key = key + '';
  if (!this.cache[key]) {
    return;
  }
  this._makeMostRecent(key);
  return this.cache[key];
};

/**
  * Set a value in the cache. If the max size is reached, the least recently
  * used item will be popped off.
  */
LRUCache.prototype.set = function(key, val) {
  key = key + '';
  if (!this.cache[key]) {
    this.size += 1;
  }
  this.cache[key] = val;
  this._makeMostRecent(key);

  if (this.size > this.maxSize) {
    this._pop();
  }
};

LRUCache.prototype._makeMostRecent = function (key) {
  var current = this.useReverse[key];
  if (current === this.mostRecent) {
    return;
  } else if (current) {
    delete this.useIndex[current];
  }

  this.mostRecent += 1;
  var newIndex = this.mostRecent;
  this.useIndex[newIndex] = key;
  this.useReverse[key] = newIndex;
}

LRUCache.prototype._pop = function () {
  while (this.leastRecent < this.mostRecent) {
    var oldKey = this.useIndex[this.leastRecent];
    if (!oldKey) {
      this.leastRecent += 1;
      continue;
    }

    delete this.useIndex[this.leastRecent];
    delete this.useReverse[oldKey];
    delete this.cache[oldKey];
    this.leastRecent += 1;
    this.size -= 1;
    return;
  }
}

module.exports = LRUCache;
