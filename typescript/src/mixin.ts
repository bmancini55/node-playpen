// https://www.typescriptlang.org/docs/handbook/mixins.html#how-does-a-mixin-work

namespace SimpleMixin {
  export class Sprite {
    name = '';
    x = 0;
    y = 0;

    constructor(name: string) {
      this.name = name;
    }
  }

  export type Constructor = new (...args: any[]) => {};

  export function Scale<TBase extends Constructor>(Base: TBase) {
    return class Scaling extends Base {
      _scale: number = 1;

      setScale(scale: number) {
        this._scale = scale;
      }

      get scale() {
        return this._scale;
      }
    };
  }

  export const EightBitSprite = Scale(Sprite);
}

namespace TypedMixin {
  export type GenericConstructor<T> = new (...args: any[]) => T;

  export type Positionable = GenericConstructor<{ setPos: (x: number, y: number) => void }>;
  export type Spritable = GenericConstructor<typeof SimpleMixin.Sprite>;
  export type Loggable = GenericConstructor<{ print: () => void }>;

  export function Jumpable<TBase extends Positionable>(Base: TBase) {
    return class Jumpable extends Base {
      jump() {
        this.setPos(0, 20);
      }
    };
  }
}
