class CustomElement {
    constructor(type) {
        this.type = type;
        this.innerHTML = "";
        this.childrenIdList = [];
        this.id = Symbol();
    }
    appendChild(element) {
        this.childrenIdList.push(element.id);
    }
}

class VDocument {
    constructor() {
        this.rootList = [];
        this.nodes = {};
    }
    appendChild(element) {
        this.rootList.push(element.id);
    }
    createElement(type) {
        const el = new CustomElement(type);
        this.nodes[el.id] = el;
        return el;
    }
    render() {
        let ans = "<html>";
        function helper(root, indentation) {
            ans = ans + "\n" + " ".repeat(indentation) + `<${root.type}>`;
            if (root.innerHTML) {
                ans = ans + "\n" + " ".repeat(indentation + 4) + root.innerHTML;
            } else {
                root.childrenIdList.forEach((elementId) => {
                    const node = this.nodes[elementId];
                    helper(node, indentation + 4);
                });
            }
            ans = ans + "\n" + " ".repeat(indentation) + `</${root.type}>`;
        }
        this.rootList.forEach((elementId) => {
            const node = this.nodes[elementId];
            helper.call(this, node, 4);
        });
        ans = ans + "\n</html>";
        return ans;
    }
}

const vDocument = new VDocument();
const body = vDocument.createElement("body");
const div = vDocument.createElement("div");

div.innerHTML = "Hello, I am a div!";
body.appendChild(div);
vDocument.appendChild(body);

// proper html structure 
const html = vDocument.render();
console.log(html);
