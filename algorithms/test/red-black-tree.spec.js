const { expect } = require('chai');
const { Color } = require('../src/red-black-tree');
const { RBNode } = require('../src/red-black-tree');
const { getParent } = require('../src/red-black-tree');
const { getGrandParent } = require('../src/red-black-tree');
const { getSibling } = require('../src/red-black-tree');
const { getUncle } = require('../src/red-black-tree');
const { rotateLeft } = require('../src/red-black-tree');
const { rotateRight } = require('../src/red-black-tree');
const { insert } = require('../src/red-black-tree');

describe('red black tree', () => {
	describe('getParent', () => {
		it('should return null at root', () => {
			let n = new RBNode(1);
			let r = getParent(n);
			expect(r).to.be.null;
		});

		it('should return parent', () => {
			let p = new RBNode(2);
			let n = new RBNode(1);
			n.parent = p;
			let r = getParent(n);
			expect(r).to.equal(p);
		});
	});

	describe('getGrandParent', () => {
		it('should return null when no parent', () => {
			let n = new RBNode(1);
			expect(getGrandParent(n)).to.be.null;
		});

		it('should return null when parent is root', () => {
			let p = new RBNode(2);
			let n = new RBNode(1);
			n.parent = p;
			expect(getGrandParent(n)).to.be.null;
		});

		it('should return grand parent', () => {
			let g = new RBNode(3);
			let p = new RBNode(2);
			let n = new RBNode(1);
			n.parent = p;
			p.parent = g;
			expect(getGrandParent(n)).to.equal(g);
		});
	});

	describe('getSibling', () => {
		it('should return null for root', () => {
			let n = new RBNode(1);
			expect(getSibling(n)).to.be.null;
		});

		it('should return null when no sibling', () => {
			let p = new RBNode(2);
			let n = new RBNode(1);
			n.parent = p;
			expect(getSibling(n)).to.be.null;
		});

		it('should return sibling', () => {
			let p = new RBNode(2);
			let n = new RBNode(1);
			let s = new RBNode(3);
			p.left = n;
			p.right = s;
			n.parent = p;
			s.parent = p;
			expect(getSibling(n)).to.equal(s);
		});
	});

	describe('getUncle', () => {
		it('should return null root', () => {
			let n = new RBNode(1);
			expect(getUncle(n)).to.be.null;
		});

		it('should return null when parent is root', () => {
			let p = new RBNode(2);
			let n = new RBNode(1);
			p.left = n;
			n.parent = p;
			expect(getUncle(n)).to.be.null;
		});

		it('should return null when parent has no sibling', () => {
			let g = new RBNode(3);
			let p = new RBNode(2);
			let n = new RBNode(1);
			g.left = p;
			p.left = n;
			n.parent = p;
			p.parent = g;
			expect(getUncle(n)).to.be.null;
		});

		it('should return parents sibling', () => {
			let g = new RBNode(3);
			let p = new RBNode(2);
			let u = new RBNode(4);
			let n = new RBNode(1);
			g.left = p;
			g.right = u;
			p.left = n;
			n.parent = p;
			p.parent = g;
			u.parnet = g;
			expect(getUncle(n)).to.equal(u);
		});
	});

	describe('rotateLeft', () => {
		let p = new RBNode(7);
		let x = new RBNode(3);
		let A = new RBNode(1);
		let y = new RBNode(5);
		let B = new RBNode(4);
		let C = new RBNode(6);
		p.left = x;
		x.left = A;
		x.right = y;
		y.left = B;
		y.right = C;
		x.parent = p;
		y.parent = x;
		A.parent = x;
		B.parent = y;
		C.parent = y;

		it('should rotate the right child to the left', () => {
			rotateLeft(x);
		});

		it('p.left should now be y', () => {
			expect(p.left).to.equal(y);
		});

		it('y should have the original parent', () => {
			expect(y.parent).to.equal(p);
		});

		it('x should have y as a parent', () => {
			expect(x.parent).to.equal(y);
		});

		it('B should now have x as a parent', () => {
			expect(B.parent).to.equal(x);
		});

		it('y.left should now be x', () => {
			expect(y.left).to.equal(x);
		});

		it('y.right should still be C', () => {
			expect(y.right).to.equal(C);
		});

		it('x.left should still be A', () => {
			expect(x.left).to.equal(A);
		});

		it('x.right should now be B', () => {
			expect(x.right).to.equal(B);
		});
	});

	describe('rotateRight', () => {
		let p = new RBNode(7);
		let x = new RBNode(5);
		let y = new RBNode(3);
		let A = new RBNode(1);
		let B = new RBNode(4);
		let C = new RBNode(6);
		p.left = x;
		x.left = y;
		x.right = C;
		y.left = A;
		y.right = B;
		x.parent = p;
		y.parent = x;

		it('should rotate the left child to the right', () => {
			rotateRight(x);
		});

		it('p.left should now be y', () => {
			expect(p.left).to.equal(y);
		});

		it('y should have the original parent', () => {
			expect(y.parent).to.equal(p);
		});

		it('x should have y as a parent', () => {
			expect(x.parent).to.equal(y);
		});

		it('B should now have x as a parent', () => {
			expect(B.parent).to.equal(x);
		});

		it('y.left should still be A', () => {
			expect(y.left).to.equal(A);
		});

		it('y.right should now be x', () => {
			expect(y.right).to.equal(x);
		});

		it('x.left should now be B', () => {
			expect(x.left).to.equal(B);
		});

		it('x.right should still be C', () => {
			expect(x.right).to.equal(C);
		});
	});

	describe('insert', () => {
		describe('case 1: first item', () => {
			it('color it black', () => {
				let n = new RBNode(1);
				let r = insert(null, n);
				expect(r).to.equal(n);
				expect(n.color).to.equal(Color.Black);
			});
		});

		describe('case 2: black parent', () => {
			it('colors it red', () => {
				let p = new RBNode(2);
				let n = new RBNode(1);
				insert(null, p);
				insert(p, n);
				expect(n.color).to.equal(Color.Red);
			});
		});

		describe('case 3: parent and uncle are red', () => {
			let g = new RBNode(3);
			let p = new RBNode(2);
			let u = new RBNode(4);
			let n = new RBNode(1);

			before(() => {
				// eslint-disable-next-line no-unused-vars
				let r = null;
				r = insert(r, g);
				r = insert(r, p);
				r = insert(r, u);
				r = insert(r, n);
			});

			it('should color grandparent black recursively', () => {
				expect(g.color).to.equal(Color.Black);
			});

			it('should color parent black', () => {
				expect(p.color).to.equal(Color.Black);
			});

			it('should color uncle black', () => {
				expect(u.color).to.equal(Color.Black);
			});

			it('should color node red', () => {
				expect(n.color).to.equal(Color.Red);
			});
		});

		describe('case 4: left node outside grandparent', () => {
			//         5-b               5-b
			//        /  \              /   \
			//  >   4-b   6-b   ->    3-b    6-b
			//     /                 /   \
			//    3-r              2-r    4-r
			//   /
			//  2-r

			let f = new RBNode(5);
			let g = new RBNode(4);
			let u = new RBNode(6);
			let p = new RBNode(3);
			let n = new RBNode(2);

			it('should right rotate grandparent', () => {
				// eslint-disable-next-line no-unused-vars
				let r = null;
				r = insert(r, f);
				r = insert(r, g);
				r = insert(r, u);
				r = insert(r, p);
				r = insert(r, n);
			});

			it('parent should be where grandparent was', () => {
				expect(f.left).to.equal(p);
			});

			it('node should be left child of parent', () => {
				expect(p.left).to.equal(n);
			});

			it('grandparent should be right child of parent', () => {
				expect(p.right).to.equal(g);
			});

			it('root should be black', () => {
				expect(f.color).to.equal(Color.Black);
			});

			it('grand uncle should be black', () => {
				expect(u.color).to.equal(Color.Black);
			});

			it('parent should be black', () => {
				expect(p.color).to.equal(Color.Black);
			});

			it('grandparent should be red', () => {
				expect(g.color).to.equal(Color.Red);
			});

			it('node should be red', () => {
				expect(n.color).to.equal(Color.Red);
			});
		});

		describe('case 4: right node outside grandparent', () => {
			//      5-b                   5-b
			//     /   \                 /   \
			//   4-b    6-b  <         4-b   7-b  <
			//            \       ->        /   \
			//             7-r            6-r   8-r
			//               \
			//               8-r

			let f = new RBNode(5);
			let g = new RBNode(6);
			let u = new RBNode(4);
			let p = new RBNode(7);
			let n = new RBNode(8);

			it('should left rotate grandparent', () => {
				// eslint-disable-next-line no-unused-vars
				let r = null;
				r = insert(r, f);
				r = insert(r, g);
				r = insert(r, u);
				r = insert(r, p);
				r = insert(r, n);
			});

			it('parent should be where grandparent was', () => {
				expect(f.right).to.equal(p);
			});

			it('grandparent should be left child of parent', () => {
				expect(p.left).to.equal(g);
			});

			it('node should be right child of parent', () => {
				expect(p.right).to.equal(n);
			});

			it('root should be colored black', () => {
				expect(f.color).to.equal(Color.Black);
			});

			it('grand uncle should be black', () => {
				expect(u.color).to.equal(Color.Black);
			});

			it('parent should be black', () => {
				expect(p.color).to.equal(Color.Black);
			});

			it('grandparent should be red', () => {
				expect(g.color).to.equal(Color.Red);
			});

			it('node should be red', () => {
				expect(n.color).to.equal(Color.Red);
			});
		});

		describe('case 4: left node inside grandparent', () => {
			//         5-b               5-b
			//        /  \              /   \
			//  >   4-b   6-b   ->    3-b    6-b
			//     /                 /   \
			//    2-r              2-r    4-r
			//       \
			//        3-r

			let f = new RBNode(5);
			let g = new RBNode(4);
			let u = new RBNode(6);
			let p = new RBNode(2);
			let n = new RBNode(3);

			it('should left rotate parent, then right rotate grandparent', () => {
				// eslint-disable-next-line no-unused-vars
				let r = null;
				r = insert(r, f);
				r = insert(r, g);
				r = insert(r, u);
				r = insert(r, p);
				r = insert(r, n);
			});

			it('node should be where grandparent was', () => {
				expect(f.left).to.equal(n);
			});

			it('parent should be left child of node', () => {
				expect(n.left).to.equal(p);
			});

			it('grandparent should be right child of node', () => {
				expect(n.right).to.equal(g);
			});

			it('root should be black', () => {
				expect(f.color).to.equal(Color.Black);
			});

			it('grand uncle should be black', () => {
				expect(u.color).to.equal(Color.Black);
			});

			it('node should be black', () => {
				expect(n.color).to.equal(Color.Black);
			});

			it('parent should be red', () => {
				expect(p.color).to.equal(Color.Red);
			});

			it('grandparent should be red', () => {
				expect(g.color).to.equal(Color.Red);
			});
		});

		describe('case 4: right node inside grandparent', () => {
			//      5-b                   5-b
			//     /   \                 /   \
			//   4-b    6-b            4-b   7-b
			//            \      ->         /   \
			//             8-r            6-r   8-r
			//            /
			//          7-r

			let f = new RBNode(5);
			let u = new RBNode(4);
			let g = new RBNode(6);
			let p = new RBNode(8);
			let n = new RBNode(7);

			it('should right rotate parent, then right rotate grandparent', () => {
				// eslint-disable-next-line no-unused-vars
				let r = null;
				r = insert(r, f);
				r = insert(r, g);
				r = insert(r, u);
				r = insert(r, p);
				r = insert(r, n);
			});

			it('node should be where grandparent was', () => {
				expect(f.right).to.equal(n);
			});

			it('grandparent should be left child of node', () => {
				expect(n.left).to.equal(g);
			});

			it('parent should be right child of node', () => {
				expect(n.right).to.equal(p);
			});

			it('root should be colored black', () => {
				expect(f.color).to.equal(Color.Black);
			});

			it('grand uncle should be black', () => {
				expect(u.color).to.equal(Color.Black);
			});

			it('node should be black', () => {
				expect(n.color).to.equal(Color.Black);
			});

			it('grand parent should be red', () => {
				expect(g.color).to.equal(Color.Red);
			});

			it('parent should be red', () => {
				expect(p.color).to.equal(Color.Red);
			});
		});
	});
});
