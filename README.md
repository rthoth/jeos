jeos.js
===

A simple and strange js framework.


Download
---


Master release at [here](https://raw.github.com/rthoth/jeos/master/build/jeos.dev.js)


Usage
---

Example:

```js

    var triangleCoordinates = [
        [-100,-100], [100,-100],[0,100]
    ];
    
    var weightedOffset = jeos.WeightedOffset.from(triangleCoordinates);
    
    var triangleOffsetedCoordinates = weightedOffset.offset(function (distance) {
        return distance ? Math.sqrt(distance) : 10;
    });
    
    // Supose svg library
    svg.polygon(triangleOffsetedCoordinates);
    

```