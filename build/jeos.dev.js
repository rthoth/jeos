(function(jeos) {
    var pow = jeos.pow = Math.pow;
    var sqrt = jeos.sqrt = Math.sqrt;
    var abs = jeos.abs = Math.abs;
    var Type = jeos.Type = function(prototype) {
        var type = function() {
            if (this.initialize) this.initialize.apply(this, arguments);
        };
        for (var key in prototype) {
            if (prototype.hasOwnProperty(key)) type.prototype[key] = prototype[key];
        }
        return type;
    };
    var Point = function(x, y) {
        this.x = x;
        this.y = y;
    };
    Point.prototype.toString = function() {
        return "(" + this.x + ", " + this.y + ")";
    };
    var point = jeos.point = function(arg1, arg2) {
        if (arguments.length === 1) return new Point(arg1[0], arg1[1]); else return new Point(arg1, arg2);
    };
    var Vector = function(i, j) {
        this.i = i;
        this.j = j;
    };
    Vector.prototype.length = function() {
        return sqrt(pow(this.i, 2) + pow(this.j, 2));
    };
    Vector.prototype.reverse = function() {
        return new Vector(-this.i, -this.j);
    };
    var vector = jeos.vector = function(arg1, arg2) {
        if (arguments.length === 1) return new Vector(arg1[0], arg1[1]); else return new Vector(arg2.x - arg1.x, arg2.y - arg1.y);
    };
})(function() {
    this.jeos = {
        toString: "jeos",
        $: {}
    };
    return this.jeos;
}());

(function(jeos) {
    var angle = jeos.angle = function(vec) {
        var x = vec.i < 0 ? -vec.i : vec.i;
        var y = vec.j < 0 ? -vec.j : vec.j;
        var angle;
        if (x >= y) angle = y / x; else angle = 2 - x / y;
        if (vec.i < 0) angle = 4 - angle;
        if (vec.j < 0) angle = 8 - angle;
        return angle;
    };
})(function() {
    return this.jeos;
}());

(function(jeos) {
    var normalPRP = jeos.normalPRP = function(vec, p, q) {
        var lr = vec.j * (q.y - p.y) + vec.i * (q.x - p.x);
        return lr < 0 ? 1 : lr > 0 ? 2 : 0;
    };
    var clockWise = jeos.clockWise = function(points) {
        var sum = 0;
        for (var i = 0; i < points.length; i++) {
            var p = points[i];
            var q = points[(i + 1) % points.length];
            sum += p.x * q.y - q.x * p.y;
        }
        return sum > 0 ? -1 : sum < 0 ? 1 : 0;
    };
    var straightPointDistance = jeos.spd = function(straightPoint, vec, point) {
        var vpa = jeos.vector(straightPoint, point);
        var z = vpa.i * vec.j - vpa.j * vec.i;
        return jeos.sqrt(z * z / (jeos.pow(vec.i, 2) + jeos.pow(vec.j, 2)));
    };
    var prp = jeos.prp = function(p, vec, q) {
        var z = vec.i * (q.y - p.y) - vec.j * (q.x - p.x);
        return z > 0 ? 1 : z < 0 ? 2 : 0;
    };
})(function() {
    return this.jeos;
}());

(function(ext) {
    var $remove = ext.remove = function(array, func) {
        var filtered = [];
        for (var i = 0; i < array.length; i) if (func(array[i], i)) {
            filtered.push(array[i]);
            array.splice(i, 1);
        } else i++;
        return filtered;
    };
    var $result = ext.result = function(check) {
        var $content = [];
        var resulter = function() {
            if (arguments.length === 0) return $content; else {
                if (!check || check($content, Array.prototype.slice.call(arguments, 0))) $content.push(Array.prototype.slice.call(arguments, 0));
            }
        };
        resulter.$content = $content;
        return resulter;
    };
})(function() {
    return this.jeos.$;
}());

(function(jeos) {
    var vector = jeos.vector, point = jeos.point;
    var Edge = jeos.Edge = jeos.Type({
        initialize: function(p, q) {
            this.p = p;
            this.q = q;
            this.pq = vector(p, q);
        },
        normal: function(length) {
            var lpq = this.pq.length();
            var i = -(this.pq.j * length) / lpq;
            var j = this.pq.i * length / lpq;
            return vector([ i, j ]);
        },
        pointAt: function(index) {
            return point(this.p.x + this.pq.i * index, this.p.y + this.pq.j * index);
        },
        toString: function() {
            return "Edge(" + this.p + ", " + this.q + ")";
        }
    });
    Edge.from = function(p, q) {
        return new Edge(point(p), point(q));
    };
})(function() {
    return this.jeos;
}());

(function(jeos) {
    var Polygon = jeos.Polygon = jeos.Type({
        initialize: function(points) {
            this.edges = [];
            this.points = points;
            for (var i = 0; i < points.length; i++) {
                var p = points[i];
                var q = points[(i + 1) % points.length];
                this.edges.push(new jeos.Edge(p, q));
            }
        },
        edge: function(i) {
            return this.edges[i];
        },
        isClockWise: function() {
            var clockWise = jeos.clockWise(this.points);
            if (clockWise === 1) return true; else if (clockWise === 0) throw new Error("Irregular polygon!");
            return false;
        },
        isCounterClockWise: function() {
            var clockWise = jeos.clockWise(this.points);
            if (clockWise === -1) return true; else if (clockWise === 0) throw new Error("Irregular polygon!");
            return false;
        },
        reverse: function() {
            return new Polygon(this.points.slice(0).reverse());
        }
    });
    Polygon.from = function(coordinates) {
        return new Polygon(coordinates.map(function(coordinate) {
            return jeos.point(coordinate);
        }));
    };
})(function() {
    return this.jeos;
}());

(function(jeos) {
    var indexOf = jeos.indexOf = function(r, p, vec) {
        var dx = p.x - r.x, dy = p.y - r.y;
        return -(vec.i * dx + vec.j * dy) / (jeos.pow(vec.i, 2) + jeos.pow(vec.j, 2));
    };
})(function() {
    return this.jeos;
}());

(function(jeos) {
    var pointAt = function(sp, svec, lp, lvec) {
        var dx = sp.x - lp.x, dy = sp.y - lp.y;
        var l_scalar_s = lvec.i * svec.i + lvec.j * svec.j;
        var scalar = -((lvec.i * dx + lvec.j * dy) / l_scalar_s);
        var x = sp.x + scalar * svec.i;
        var y = sp.y + scalar * svec.j;
        return jeos.point(x, y);
    };
    var $m = function(p) {
        return (p.ed - p.sd) / (p.ei - p.si);
    };
    var Projection = jeos.Projection = jeos.Type({
        initialize: function(si, sd, ei, ed) {
            this.si = si;
            this.sd = sd;
            this.ei = ei;
            this.ed = ed;
        },
        valueAt: function(x) {
            if (this.si === x) return this.sd;
            if (this.ei === x) return this.ed;
            if (this.$m === undefined) {
                this.$m = $m(this);
                this.$c = this.sd - this.$m * this.si;
            }
            return this.$m * x + this.$c;
        },
        toString: function() {
            return "[(" + this.si + ", " + this.sd + "), (" + this.ei + ", " + this.ed + ")]";
        }
    });
    Projection.from = function(other, target) {
        var startPoint = other.p;
        var endPoint = other.q;
        var startIndex = jeos.indexOf(startPoint, target.p, target.pq);
        var endIndex = jeos.indexOf(endPoint, target.p, target.pq);
        if (endIndex < startIndex) {
            var t = startPoint;
            startPoint = endPoint;
            endPoint = t;
            t = endIndex;
            endIndex = startIndex;
            startIndex = t;
        }
        if (startIndex < 0) {
            startPoint = pointAt(startPoint, other.pq, target.p, target.pq);
            startIndex = 0;
        }
        if (endIndex > 1) {
            endPoint = pointAt(endPoint, other.pq, target.q, target.pq);
            endIndex = 1;
        }
        var si = startIndex;
        var sd = jeos.spd(target.p, target.pq, startPoint);
        var ei = endIndex;
        var ed = jeos.spd(target.p, target.pq, endPoint);
        return new Projection(si, sd, ei, ed);
    };
    var hasProjection = jeos.hasProjection = function(source, target) {
        var pp = jeos.prp(target.p, target.pq, source.p);
        var qp = jeos.prp(target.p, target.pq, source.q);
        if (!((pp | qp) & 1)) return false;
        var pointValue = function(point) {
            var rp = jeos.normalPRP(target.pq, target.p, point);
            var rq = jeos.normalPRP(target.pq, target.q, point);
            return rp | rq;
        };
        var vP = pointValue(source.p);
        var vQ = pointValue(source.q);
        var projects = vP !== vQ ? true : vQ === 3;
        if (projects) {
            var targetAngle = jeos.angle(target.pq);
            var sourceAngle = jeos.angle(source.pq);
            var delta = jeos.abs(targetAngle - sourceAngle);
            projects = delta > 2 && delta < 6;
        }
        return projects;
    };
    var detectProjections = jeos.detectProjections = function(edges, func) {
        var result = [];
        for (var i = 0; i < edges.length; i++) {
            var projections = [];
            for (var j = 0; j < edges.length; j++) {
                if (j !== i && hasProjection(edges[j], edges[i])) {
                    if (func) projections.push(func(edges[j], edges[i])); else projections.push(edges[j]);
                }
            }
            result.push(projections);
        }
        return result;
    };
})(function() {
    return this.jeos;
}());

(function(jeos) {
    var isOut = function(p) {
        if (p.si < 0) throw new Error("Start index invalid!");
        if (p.ei > 1) throw new Error("End index invalid!");
    };
    var byIndex = function(p1, p2) {
        isOut(p1);
        isOut(p2);
        if (p1.si < p2.si) return -1; else if (p2.si < p1.si) return 1;
        if (p1.sd < p2.sd) return -1; else if (p2.sd < p1.sd) return 1;
        if (p1.ed < p2.ed) return -1; else if (p2.ed < p1.ed) return 1;
        if (p1.ei < p2.ei) return -1; else if (p2.ei < p1.ei) return 1; else throw Error("Ouch!");
    };
    var shadows = jeos.shadows = function(projections) {
        return projections.map(function(projs) {
            return scanLine(projs.slice(0).sort(byIndex));
        });
    };
    var scanLine = function(projs) {
        var result = jeos.$.result(function(values, resp) {
            if (values.length) {
                var i = values[values.length - 1][0];
                var d = values[values.length - 1][1];
                return i !== resp[0] || d !== resp[1];
            }
            return true;
        });
        var visible = projs.shift();
        var position = visible.si;
        var shadoweds = [];
        var next;
        var checkShadoweds = function() {
            jeos.$.remove(shadoweds, function(shadowed) {
                return shadowed.ei <= position;
            });
        };
        var nearestShadowed = function() {
            var index2Remove = 0;
            var nearest = shadoweds.reduce(function(winner, opponet, index) {
                if (opponet.valueAt(position) < winner.valueAt(position)) {
                    index2Remove = index;
                    return opponet;
                } else return winner;
            });
            shadoweds.splice(index2Remove, 1);
            return nearest;
        };
        result(position, visible.valueAt(position));
        while (projs.length) {
            next = projs.shift();
            while (visible.ei < next.si) {
                if (position <= visible.ei) {
                    position = visible.ei;
                    checkShadoweds();
                    result(position, visible.valueAt(position));
                } else {
                    throw new Error("Unexpected!");
                }
                visible = nearestShadowed();
                result(position, visible.valueAt(position));
            }
            position = next.si;
            checkShadoweds();
            if (next.valueAt(position) < visible.valueAt(position)) {
                result(position, visible.valueAt(position));
                result(position, next.valueAt(position));
                shadoweds.unshift(visible);
                visible = next;
            } else {
                shadoweds.push(next);
            }
        }
        position = visible.ei;
        result(position, visible.valueAt(position));
        checkShadoweds();
        while (shadoweds.length) {
            visible = nearestShadowed();
            result(position, visible.valueAt(position));
            if (position !== visible.ei) {
                position = visible.ei;
                result(position, visible.valueAt(position));
            }
            checkShadoweds();
        }
        return result();
    };
})(function() {
    return this.jeos;
}());

(function(jeos) {
    var WeightedOffset = jeos.WeightedOffset = jeos.Type({
        initialize: function(polygon) {
            this.polygon = polygon.isClockWise() ? polygon.reverse() : polygon;
        },
        offset: function(func) {
            var edges = this.polygon.edges;
            var projections = jeos.detectProjections(edges, function(source, target) {
                return jeos.Projection.from(source, target);
            });
            var shadows = jeos.shadows(projections, func);
            var result = [];
            shadows.forEach(function(projections, edgeIndex) {
                var edge = edges[edgeIndex];
                projections.forEach(function(proj) {
                    var length = func(proj[1]);
                    var externalVector = edge.normal(-length);
                    var point = edge.pointAt(proj[0]);
                    result.push([ point.x + externalVector.i, point.y + externalVector.j ]);
                });
            });
            return result;
        }
    });
    WeightedOffset.from = function(coordinates) {
        return new WeightedOffset(jeos.Polygon.from(coordinates));
    };
})(function() {
    return this.jeos;
}());