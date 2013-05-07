jeos.js
===

A simple and strange js framework.


Download
---


Download developer branch [here](https://raw.github.com/rthoth/jeos/dev-0.2/build/jeos.min.js)!


Usage
---

Example:

```js

    var triangleCoordinates = [
        [-100,-100], [100,-100],[0,100]
    ];
    
    var weightedOffset = new WeightedOffset(trianguleCoordinates);
    
    var triangleOffsetedCoordinates = weightedOffset.offset(function (distance) {
        return distance ? Math.sqrt(distance) : 10;
    });
    
    // Supose svg library
    svg.polygon(triangleOffsetedCoordinates);
    

```