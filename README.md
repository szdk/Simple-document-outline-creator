# Simple-document-outline-creator
Simple Document outline creator with javascript

## Usage
Generate for headings in entire document:
```javascript
let raw = DOCreator.getRaw();
let documentOutlines = DOCreator.get(raw);
document.body.insertBefore(documentOutlines, document.body.firstChild);
```
Generate for headings in specific element:
```javascript
let raw = DOCreator.getRaw(
    document.getElementById('specific_element').querySelectorAll('h2,h3,h4,h5,h6')
);
let documentOutlines = DOCreator.get(raw);
document.body.insertBefore(documentOutlines, document.body.firstChild);
```
