'use strict'

describe("Airport", function() {
  var airport;
  var plane;

  beforeEach(function() {
    airport = new Airport();
    plane = new Plane();
  });

  describe('good weather', function(){
    beforeEach(function() {
      spyOn(airport, 'weatherReport').and.returnValue('sunny');
    })

    it('has a capacity of 10 by default', function() {
      expect(airport.capacity).toEqual(10)
    });

    it('is able to change capacity', function() {
      var bigCapacityAP = new Airport(20);
      expect(bigCapacityAP.capacity).toEqual(20)
    })

    it("should be able to land a plane", function() {
      airport.land(plane);
      expect(airport._planes).toEqual([plane]);
    });

    it("should be able to land two planes", function() {
      airport.land(plane);
      airport.land(plane);
      expect(airport._planes).toEqual([plane, plane]);
    });

    it('does not allow plane to land if full', function() {
      [1,2,3,4,5,6,7,8,9,10].forEach(function() {
        airport.land(plane);
      });
      expect(function() {airport.land(plane)}).toThrowError('Unable to land, full...');
    });

    it("should be able to take off a plane", function() {
      airport.land(plane);
      airport.takeoff(plane);
      expect(airport._planes).toEqual([]);
    });
  });

  describe('weatherReport', function() {
    it('returns stormy or sunny', function() {
      expect(['stormy', 'sunny']).toContain(airport.weatherReport())
    });
  });

  describe('stormy weather', function(){
    beforeEach(function() {
      spyOn(airport, 'weatherReport').and.returnValue('stormy');
    });

    it('doesn\'t allow planes to land if stormy', function() {
      console.log('landing if stormy test');
      console.log(airport.weatherReport());
      expect(function() {airport.land(plane);}).toThrowError('Unable to land, stormy...');
    });

    it('doesn\'t allow planes to take off when stormy', function() {
      expect(function() {airport.takeoff();}).toThrowError('Unable to takeoff, stormy...');
    });
  });
});
