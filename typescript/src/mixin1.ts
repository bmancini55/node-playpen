// https://www.typescriptlang.org/docs/handbook/mixins.html
// $(npm bin)/ts-node mixin.ts

// Constructs a base class that we will extend via mixins
class Peer {
  constructor() {
    console.log('creating Peer');
  }

  public connect() {
    console.log('connecting');
  }
}

// Defines a constructor type. The constructor type allows us to use
// constaints to restruct the types that may use the mixin.
type Constructor<T = {}> = new (...args: any[]) => T;

// Create a GossipQueries /trait/mixin that adds new methods to our base
// class related to the gossip_queries.
function GossipQuerable<TBase extends Constructor>(Base: TBase) {
  return class GossipQuerable extends Base {
    constructor(...args: any[]) {
      super();
      console.log('creating GossipQuerable');
    }

    public queryRange() {
      console.log('querying range');
    }
  };
}

// Construct a new type that includes the mixed functionality.
const GossipQueriesPeer = GossipQuerable(Peer);

// Instantiate our mixed in class and call methods for each!
const peer = new GossipQueriesPeer();
peer.connect();
peer.queryRange();
