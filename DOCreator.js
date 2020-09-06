class DOCreatorNode {
    constructor (element, children = [], isParent = false) {
        if (isParent)
            this.level = 0;
        else
            this.level = ({
                H2:1,
                H3:2,
                H4:3,
                H5:4,
                H6:5,
            })[element.tagName];
        if (typeof this.level == 'undefined') {
            throw "Invalid heading element. Only h2, h3, h4, h5, and h6 elements are accepted";
        }
        this.element = element;
        this.children = children;
    }

    push (DOCreatorNodeObj) {
        if (typeof DOCreatorNodeObj.level == 'undefined' || DOCreatorNodeObj.level <= this.level) {
            throw "Invalid Heading Level";
        }
        if (DOCreatorNodeObj.level == (this.level + 1) || !this.children[0]) {
            return this.children.push(DOCreatorNodeObj);
        }
        return this.children[this.children.length - 1].push(DOCreatorNodeObj);
    }
}

class DOCreator {
    static getRaw (nodes = null) {
        if (!nodes) {
            nodes = document.querySelectorAll('h2, h3, h4, h5, h6');
        }
        if (!nodes[0]) {
            return false;
        }
        let mainNode = new DOCreatorNode(document.createElement('li'), [], true);
        for (let index = 0; index < nodes.length; index++) {
            mainNode.push(new DOCreatorNode(nodes[index]));
        }
        return mainNode;
    }

    static get(raw, generateHash = "doc_h", listType = 'ul', isParent = true) {
        var item = document.createElement('li');
        if (!isParent && generateHash) {
            let anchor = document.createElement('a');
            anchor.innerHTML = raw.element.innerHTML;
            item.appendChild(anchor);
            let hashID = raw.element.id;
            if (!Boolean(hashID)) {
                if (typeof DOCreator.hashNumber == 'undefined')
                    DOCreator.hashNumber = 0;
                hashID =  generateHash + DOCreator.hashNumber;
                raw.element.id = hashID;
                DOCreator.hashNumber++;
            }
            anchor.href = "#" + hashID;
        } else
            item.innerHTML = raw.element.innerHTML;

    
        if (raw.children[0]) {
            let list = document.createElement(listType);
            raw.children.forEach(childRaw => {
                list.appendChild(DOCreator.get(childRaw, generateHash, listType, false));
            });
            if (isParent) {
                return list;
            }
            item.appendChild(list);
        }
        return item;
    }
}
