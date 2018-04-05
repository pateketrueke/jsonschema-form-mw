import { t, Selector } from 'testcafe';

function inSequence(prev, cur) {
  return prev.then(() => {
    if (typeof cur === 'function') {
      return cur();
    }

    return cur;
  });
}

export default class Component {
  _setupSelectors() {
    Object.keys(this).forEach(prop => {
      if (typeof this[prop] === 'string') {
        this[prop] = Selector(this[prop]);
      }
    });
  }

  _setupMethods() {
    const proto = this.constructor.prototype;
    const props = Object.getOwnPropertyNames(proto);

    props.forEach(prop => {
      if (prop === 'constructor' || prop === 'begin' || prop === 'end') return;
      if (prop.charAt() !== '_' && typeof proto[prop] === 'function') {
        const fn = proto[prop].bind(this);

        this[prop] = (...args) => {
          this.q.push(() => fn(...args));
          return this;
        };
      }
    });
  }

  _setupScope() {
    this.t = t;
    this.q = [];
  }

  begin() {
    this._setupScope();
    this._setupMethods();
    this._setupSelectors();

    return this;
  }

  async end() {
    return this.q.reduce(inSequence, Promise.resolve());
  }
}
