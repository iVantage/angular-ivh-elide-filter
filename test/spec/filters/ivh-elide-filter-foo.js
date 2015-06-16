
describe('Service: ivhElideFilter', function() {
  'use strict';

  beforeEach(module('ivh.elideFilter'));

  var ivhElideFilter;

  var str = 'This is my text, it is superawesometacular sweet!!'; // 50 chars

  beforeEach(inject(function(_ivhElideFilter_) {
    ivhElideFilter = _ivhElideFilter_;
  }));

  it('should chop text exactly on hard breaks', function() {
    var actual = ivhElideFilter(str, 13, true);
    expect(actual).toEqual('This is my te...');
  });

  it('should search out word breaks ', function() {
    var actual = ivhElideFilter(str, 13, false);
    expect(actual).toEqual('This is my text...');
  });
});
