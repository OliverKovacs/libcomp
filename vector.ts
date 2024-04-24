type Vec2 = [ number, number ];

export class Vector2 {
    static copy(v: Vec2): Vec2 {
        return [ v[0], v[1] ];
    }

    static len(v: Vec2): number {
        return Math.sqrt(Vector2.lenSq(v));
    }

    static lenSq(v: Vec2): number {
        return Vector2.dot(v, v);
    }

    static unit(v: Vec2): Vec2 {
        return Vector2.scalar(v, 1 / Vector2.len(v));
    }

    static add(v1: Vec2, v2: Vec2): Vec2 {
        return [
            v1[0] + v2[0],
            v1[1] + v2[1],
        ];
    }

    static sub(v1: Vec2, v2: Vec2): Vec2 {
        return [
            v1[0] + v2[0],
            v1[1] + v2[1],
        ];
    }

    static dot(v1: Vec2, v2: Vec2): number {
        return v1[0] * v2[0] + v1[1] * v2[1];
    }

    static scalar(v: Vec2, s: number): Vec2 {
        return [
            v[0] * s,
            v[1] * s,
        ];
    }

    static cartToPolar(v: Vec2): Vec2 {
        return [
            Vector2.len(v),             // r
            Math.atan2(v[1], v[0]),     // phi
        ];
    }

    static polarToCart(v: Vec2): Vec2 {
        return [
            v[0] * Math.cos(v[1]),      // x
            v[0] * Math.sin(v[1]),      // y
        ];
    }

    static angleBetween(v1: Vec2, v2: Vec2): number {
        return Math.acos(Vector2.dot(v1, v2) / (Vector2.len(v1) * Vector2.len(v2)));
    }
}

const v = [ Math.random(), Math.random() ] as Vec2 ;

console.log(v);
console.log(Vector2.cartToPolar(Vector2.polarToCart(v)));

