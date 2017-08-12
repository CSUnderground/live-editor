
var {expect} = require('chai');
var LRUCache = require('./LRUCache');

describe('Cache', () => {
  it('should initialize', () => {
    var cache = new LRUCache(10);
  });

  it('should add an item', () => {
    var cache = new LRUCache(10);
    cache.set('one', 20);
    expect(cache.get('one')).to.equal(20);
    expect(cache.size).to.equal(1);
  });

  it('should pop', () => {
    var cache = new LRUCache(2);
    cache.set('one', 20);
    cache.set('two', 30);
    cache.set('three', 40);
    expect(cache.get('three')).to.equal(40);
    expect(cache.get('two')).to.equal(30);
    expect(cache.get('one')).to.not.be.ok;
  });

  it('should keep size limited', () => {
    var cache = new LRUCache(20);
    for (var i=0; i<100; i++) {
      cache.set(i, 'num' + i);
    }
    expect(cache.size).to.equal(20);
    for (var i=80; i<100; i++) {
      expect(cache.get(i)).to.equal('num' + i);
    }
    // manually check size
    var size = 0;
    for (var name in cache.cache) {
      size += 1;
    }
    expect(size).to.equal(20);
  });

  it('should keep used things around', () => {
    var cache = new LRUCache(20);
    for (var i=0; i<100; i++) {
      cache.set(i, 'num' + i);
      cache.get(42);
    }
    expect(cache.size).to.equal(20);
    for (var i=81; i<100; i++) {
      expect(cache.get(i)).to.equal('num' + i);
    }
    expect(cache.get(42)).to.equal('num42');
  });

  it('overwriting a key should not pop anything', () => {
    var cache = new LRUCache(5);
    for (var i=0; i<5; i++) {
      cache.set(i, 'num' + i);
    }
    cache.set(0, 'num0');
    cache.set(0, 'num0');
    for (var i=0; i<5; i++) {
      expect(cache.get(i)).to.equal('num' + i);
    }
  });
});

