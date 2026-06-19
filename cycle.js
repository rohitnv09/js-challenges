/*
Input:
const List = function(val){
  this.next = null;
  this.val = val;
};

const item1 = new List(10);
const item2 = new List(20);
const item3 = new List(30);

item1.next = item2;
item2.next = item3;
item3.next = item1;

// this forms a cycle, if you console.log this you will see a circular object, 
// like, item1 -> item2 -> item3 -> item1 -> so on.

Output:
// removes cycle
// item1 -> item2 -> item3

*/

const List = function (val) {
    this.next = null;
    this.val = val;
};

const item1 = new List(10);
const item2 = new List(20);
const item3 = new List(30);

item1.next = item2;
item2.next = item3;
item3.next = item1;

function removeCircularDependency(head) {
    let slow = head;
    let fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) break;
    }
    if (!fast || !fast.next) return;
    slow = head;
    while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
    }
    while (fast.next !== slow) {
        fast = fast.next;
    }
    fast.next = null;
}
removeCircularDependency(item1);
console.log("item 1 :: ", item1);