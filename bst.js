class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }
  
  class Tree {
    constructor(dataArray) {
      this.root = this.buildTree(dataArray);
    }
  
    buildTree(dataArray) {
      // Remove duplicates and sort the array
      const sortedUniqueArray = Array.from(new Set(dataArray)).sort((a, b) => a - b);
  
      // Call the recursive function to build the balanced BST
      return this.buildTreeRec(sortedUniqueArray, 0, sortedUniqueArray.length - 1);
    }
  
    buildTreeRec(sortedArray, start, end) {
      if (start > end) {
        return null;
      }
  
      // Find the middle index of the array
      const mid = Math.floor((start + end) / 2);
  
      // Create a new node with the middle element as the root
      const root = new Node(sortedArray[mid]);
  
      // Recursively build the left and right subtrees
      root.left = this.buildTreeRec(sortedArray, start, mid - 1);
      root.right = this.buildTreeRec(sortedArray, mid + 1, end);
  
      return root;
    }
    
    insert(value) {
      this.root = this.insertRec(this.root, value);
    }
  
    insertRec(root, value) {
      if (root === null) {
        return new Node(value);
      }
  
      if (value < root.data) {
        root.left = this.insertRec(root.left, value);
      } else if (value > root.data) {
        root.right = this.insertRec(root.right, value);
      }
  
      return root;
    }
      
      delete(value) {
      this.root = this.deleteRec(this.root, value);
    }
  
    deleteRec(root, value) {
      if (root === null) {
        return root;
      }
  
      if (value < root.data) {
        root.left = this.deleteRec(root.left, value);
      } else if (value > root.data) {
        root.right = this.deleteRec(root.right, value);
      } else {
        // Node with only one child or no child
        if (root.left === null) {
          return root.right;
        } else if (root.right === null) {
          return root.left;
        }
  
        // Node with two children: Get the inorder successor (smallest in the right subtree)
        root.data = this.minValue(root.right);
  
        // Delete the inorder successor
        root.right = this.deleteRec(root.right, root.data);
      }
  
      return root;
    }
  
    minValue(node) {
      let minValue = node.data;
      while (node.left !== null) {
        minValue = node.left.data;
        node = node.left;
      }
      return minValue;
    }
      
      find(value) {
      return this.findNode(this.root, value);
    }
  
    findNode(node, value) {
      if (node === null || node.data === value) {
        return node;
      }
  
      if (value < node.data) {
        return this.findNode(node.left, value);
      } else {
        return this.findNode(node.right, value);
      }
    }
    
      levelOrder(callback) {
      const result = [];
      const queue = [];
  
      if (this.root === null) {
        return result;
      }
  
      queue.push(this.root);
  
      while (queue.length > 0) {
        const currentNode = queue.shift();
        result.push(callback ? callback(currentNode) : currentNode.data);
  
        if (currentNode.left !== null) {
          queue.push(currentNode.left);
        }
  
        if (currentNode.right !== null) {
          queue.push(currentNode.right);
        }
      }
  
      return result;
    }
  
    levelOrderRecursive(callback) {
      const result = [];
      const queue = [];
  
      if (this.root !== null) {
        queue.push(this.root);
        this.levelOrderRecursiveHelper(queue, result, callback);
      }
  
      return result;
    }
  
    levelOrderRecursiveHelper(queue, result, callback) {
      if (queue.length === 0) {
        return;
      }
  
      const currentNode = queue.shift();
      result.push(callback ? callback(currentNode) : currentNode.data);
  
      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
  
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
  
      this.levelOrderRecursiveHelper(queue, result, callback);
    }
      
      inOrder(callback) {
      const result = [];
      this.inOrderRec(this.root, callback, result);
      return result;
    }
  
    inOrderRec(node, callback, result) {
      if (node !== null) {
        this.inOrderRec(node.left, callback, result);
        result.push(callback ? callback(node) : node.data);
        this.inOrderRec(node.right, callback, result);
      }
    }
  
    preOrder(callback) {
      const result = [];
      this.preOrderRec(this.root, callback, result);
      return result;
    }
  
    preOrderRec(node, callback, result) {
      if (node !== null) {
        result.push(callback ? callback(node) : node.data);
        this.preOrderRec(node.left, callback, result);
        this.preOrderRec(node.right, callback, result);
      }
    }
  
    postOrder(callback) {
      const result = [];
      this.postOrderRec(this.root, callback, result);
      return result;
    }
  
    postOrderRec(node, callback, result) {
      if (node !== null) {
        this.postOrderRec(node.left, callback, result);
        this.postOrderRec(node.right, callback, result);
        result.push(callback ? callback(node) : node.data);
      }
    }
  
    height(node) {
      if (node === null) {
        return -1;
      }
  
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
  
      return Math.max(leftHeight, rightHeight) + 1;
    }
  
    depth(node) {
      if (node === null) {
        return 0;
      }
  
      return this.depth(node.parent) + 1;
    }
  
    isBalanced() {
      return this.isBalancedRec(this.root);
    }
  
    isBalancedRec(node) {
      if (node === null) {
        return true;
      }
  
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
  
      if (Math.abs(leftHeight - rightHeight) > 1) {
        return false;
      }
  
      return this.isBalancedRec(node.left) && this.isBalancedRec(node.right);
    }
  
    rebalance() {
      const nodes = this.inOrder();
      this.root = this.buildTree(nodes);
    }
      
  }
  
  
  
  // Output the tree using a simple pretty print function
  const prettyPrint = (node, level = 0, prefix = "Root: ") => {
    if (node !== null) {
      console.log(" ".repeat(level * 4) + prefix + node.data);
      prettyPrint(node.left, level + 1, "L: ");
      prettyPrint(node.right, level + 1, "R: ");
    }
  };
  
  // Example usage:
  const dataArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
  const tree = new Tree(dataArray);
  
  // Access the root of the tree
  const root = tree.root;
  
  console.log("Original Tree:");
  prettyPrint(tree.root);
  
  tree.insert(15);
  console.log("\nTree after insertion of 15:");
  prettyPrint(tree.root);
  
  tree.delete(7);
  console.log("\nTree after deletion of 7:");
  prettyPrint(tree.root);
  
  const searchValue = 5;
  const foundNode = tree.find(searchValue);
  console.log(`\nNode with value ${searchValue}:`, foundNode);
  
  console.log("Level Order (Iteration):", tree.levelOrder());
  console.log("Level Order (Recursion):", tree.levelOrderRecursive());
  
  // Example usage with callback:
  const printNodeData = (node) => console.log(node.data);
  tree.levelOrder(printNodeData);
  
  console.log("In Order:", tree.inOrder());
  console.log("Pre Order:", tree.preOrder());
  console.log("Post Order:", tree.postOrder());
  
  console.log("\nHeight of the root:", tree.height(tree.root));
  console.log("Depth of node with value 7:", tree.depth(tree.find(7)));
  
  console.log("\nIs the tree balanced?", tree.isBalanced());
  
  tree.rebalance();
  console.log("\nAfter rebalance, In Order:", tree.inOrder());
  