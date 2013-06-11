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
    Vector.prototype.toString = function() {
        return "<" + this.i + ", " + this.j + ">";
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

(function(ext, jeos) {
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
    var Emitter = jeos.Emitter = jeos.Type({
        on: function(evt, handler) {
            this.$evt = this.$evt || {};
            this.$evt[evt] = this.$evt[evt] || [];
            this.$evt[evt].push(handler);
        },
        fire: function(evt, object) {
            if (this.$evt && this.$evt[evt]) this.$evt[evt].forEach(function(handler) {
                if (handler) handler(object);
            });
        }
    });
})(function() {
    return this.jeos.$;
}(), function() {
    return this.jeos;
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
    var numberComp = function(a, b) {
        return a - b;
    };
    var mapper = function(edge) {
        return {
            $: edge,
            x: [ edge.p.x, edge.q.x ].sort(numberComp),
            y: [ edge.p.y, edge.q.y ].sort(numberComp)
        };
    };
    var byYX = function(o1, o2) {
        if (o1.y[1] > o2.y[1]) return -1; else if (o2.y[1] > o1.y[1]) return 1; else if (o1.x[0] < o2.x[0]) return -1; else if (o2.x[0] < o1.x[0]) return 1;
        return 0;
    };
    var hasCross = function(e1, e2) {
        var e1_e2 = jeos.prp(e2.p, e2.pq, e1.p) | jeos.prp(e2.p, e2.pq, e1.q);
        var e2_e1 = jeos.prp(e1.p, e1.pq, e2.p) | jeos.prp(e1.p, e1.pq, e2.q);
        return e2_e1 === e1_e2 ? e1_e2 === 3 : false;
    };
    var crossPoint = function(e1, e2) {
        var dx = e2.p.x - e1.p.x;
        var dy = e2.p.y - e1.p.y;
        var z = e1.pq.i * e2.pq.j - e1.pq.j * e2.pq.i;
        var i1 = e2.pq.j * dx - e2.pq.i * dy;
        var i2 = e1.pq.j * dx - e1.pq.i * dy;
        i1 /= z;
        i2 /= z;
        var x = e1.p.x + i1 * e1.pq.i;
        var y = e1.p.y + i1 * e1.pq.j;
        return {
            point: jeos.point(x, y),
            i0: i1,
            i1: i2
        };
    };
    var searchIntersections = jeos.searchIntersections = function(edges) {
        edges = edges.map(mapper).sort(byYX);
        var result = jeos.$.result();
        var testSet = [];
        var y;
        var upperYtest = function(edge) {
            return edge.y[0] >= y;
        };
        edges.forEach(function(e, ei) {
            y = e.y[1];
            jeos.$.remove(testSet, upperYtest);
            testSet.forEach(function(s, si) {
                if (hasCross(e.$, s.$)) result(e.$, s.$, crossPoint(e.$, s.$));
            });
            testSet.push(e);
        });
        return result();
    };
})(function() {
    return this.jeos;
}());

(function(jeos) {
    var indexOf = jeos.indexOf;
    var p2node = function(point) {
        return {
            point: point,
            next: null,
            back: null
        };
    };
    var nn2e = function(p, q) {
        return {
            $pN: p,
            $qN: q,
            p: p.point,
            q: q.point,
            pq: jeos.vector(p.point, q.point)
        };
    };
    var convert = function(raw) {
        var nodes = raw.map(p2node);
        var edges = [];
        for (var i = 0; i < nodes.length; i++) {
            var p = nodes[i];
            var q = nodes[(i + 1) % nodes.length];
            p.next = q;
            q.back = p;
            edges.push(nn2e(p, q));
        }
        return [ nodes, edges ];
    };
    var merge = function(aNode, bNode, cNode) {
        aNode.next = bNode;
        bNode.next = cNode;
        cNode.back = bNode;
        bNode.back = aNode;
    };
    var mx = Math.max, mn = Math.min;
    var extractRing = function(current) {
        var x = [ Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY ];
        var y = [ x[0], x[1] ];
        var result = [];
        while (current && !current.visited) {
            result.push(current.point);
            x[0] = mn(x[0], current.point.x);
            x[1] = mx(x[1], current.point.x);
            y[0] = mn(y[0], current.point.y);
            y[1] = mx(y[1], current.point.y);
            current.visited = true;
            current = current.next;
        }
        result.clockWise = jeos.clockWise(result);
        result.x = x;
        result.y = y;
        if (result.clockWise === 0) throw new Error("Error, unexpected 0 clockwise!\n" + result);
        result.clockWise = result.clockWise === 1;
        return result;
    };
    var extractRings = function(nodes) {
        var result = [];
        nodes.forEach(function(node) {
            if (!node.visited) result.push(extractRing(node));
        });
        return result;
    };
    var nodeBackFrom = function(edge) {
        if (edge.pq.j > 0) return edge.$pN;
        if (edge.pq.j < 0) return edge.$qN.back;
        if (edge.pq.i > 0) return edge.$qN.back;
        if (edge.pq.i < 0) return edge.$pN;
    };
    var nodeNextFrom = function(edge) {
        if (edge.pq.j > 0) return edge.$pN.next;
        if (edge.pq.j < 0) return edge.$qN;
        if (edge.pq.i > 0) return edge.$qN;
        if (edge.pq.i < 0) return edge.$pN.next;
    };
    var pointYXSort = function(p1, p2) {
        if (p1.y > p2.y) return -1;
        if (p2.y > p1.y) return 1;
        if (p1.x < p2.x) return -1;
        if (p2.x > p2.x) return 1;
        return 0;
    };
    var yx = function(cr1, cr2) {
        return pointYXSort(cr1[2].point, cr2[2].point);
    };
    var contains = function(ring1, ring2) {
        if (ring2.x[0] < ring1.x[0] || ring2.x[1] > ring1.x[1]) return false; else if (ring2.y[0] < ring1.y[0] || ring2.y[1] > ring1.y[1]) return false; else return true;
    };
    var byContains = function(ring1, ring2) {
        if (contains(ring1, ring2)) return -1; else if (contains(ring2, ring1)) return 1; else return 0;
    };
    var container = function(ring) {
        return {
            ring: ring,
            childreen: null
        };
    };
    var containerTree = function(containers) {
        var root = containers.shift();
        var deep = function(root, containers) {
            var childreen = [], child;
            var filter = function(container) {
                return contains(child.ring, container.ring);
            };
            while (containers.length) {
                child = containers.shift();
                child.childreen = deep(child, jeos.$.remove(containers, filter));
                childreen.push(child);
            }
            return childreen.length ? childreen : null;
        };
        root.childreen = deep(root, containers);
        return root;
    };
    var sie = jeos.sie = function(raw) {
        var nodes = convert(raw);
        var edges = nodes[1];
        nodes = nodes[0];
        jeos.searchIntersections(edges).sort(yx).forEach(function(intersection) {
            var e1 = intersection[0], e2 = intersection[1], crossPoint = intersection[2];
            var node1 = p2node(crossPoint.point), node2 = p2node(crossPoint.point);
            var e1back = nodeBackFrom(e1);
            var e1next = nodeNextFrom(e1);
            var e2back = nodeBackFrom(e2);
            var e2next = nodeNextFrom(e2);
            merge(e1back, node1, e2next);
            merge(e2back, node2, e1next);
            nodes.push(node1);
            nodes.push(node2);
        });
        var tree = containerTree(extractRings(nodes).sort(byContains).map(container));
        var shell = tree.ring.slice(0);
        var holes = tree.childreen ? tree.childreen.filter(function(child) {
            return child.ring.clockWise;
        }).map(function(child) {
            return child.ring.slice(0);
        }) : [];
        return [ shell ];
    };
})(function() {
    return this.jeos;
}());

(function(jeos) {
    var WeightedOffset = jeos.WeightedOffset = jeos.Type({
        initialize: function(polygon) {
            this.polygon = polygon.isClockWise() ? polygon.reverse() : polygon;
            this.emitter = new jeos.Emitter();
        },
        offset: function(func) {
            var edges = this.polygon.edges;
            var projections = jeos.detectProjections(edges, function(source, target) {
                return jeos.Projection.from(source, target);
            });
            this.emitter.fire("project", projections);
            var shadows = jeos.shadows(projections, func);
            this.emitter.fire("shadow", shadows);
            var raw = shadows.map(function(projections, edgeIndex) {
                var currentEdge = edges[edgeIndex];
                return projections.map(function(proj) {
                    var length = func(proj[1]);
                    var externalVector = currentEdge.normal(-length);
                    var point = currentEdge.pointAt(proj[0]);
                    return jeos.point(point.x + externalVector.i, point.y + externalVector.j);
                });
            });
            this.emitter.fire("offset", raw);
            var result = jeos.sie(raw.reduce(function(current, next) {
                return current.concat(next);
            }, []));
            return result.map(function(ring) {
                return ring.map(function(point) {
                    return [ point.x, point.y ];
                });
            });
        },
        on: function(evt, handler) {
            this.emitter.on(evt, handler);
            return this;
        }
    });
    WeightedOffset.from = function(coordinates) {
        return new WeightedOffset(jeos.Polygon.from(coordinates));
    };
    var leftMiddleVector = function(u, v) {
        var lu = u.length();
        var lv = v.length();
        return jeos.vector([ u.i / lu - v.i / lv, u.j / lu - v.j / lv ]);
    };
    var rightMiddleVector = function(u, v) {
        var lu = u.length();
        var lv = v.length();
        return jeos.vector([ v.i / lv - u.i / lu, v.j / lv - u.j / lv ]);
    };
})(function() {
    return this.jeos;
}());