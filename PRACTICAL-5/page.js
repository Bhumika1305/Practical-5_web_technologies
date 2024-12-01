const MATCH_LIST = {
    'there': 'their',
    'their': 'there',
    'they\'re': 'there',
    'There': 'Their',
    'Their': 'There',
    'They\'re': 'There',
    'THERE': 'THEIR',
    'THEIR': 'THERE',
    'THEY\'RE': 'THERE'
  };
  
  function transformTextNodes(node) {
    // Recursively traverse the DOM to find all text nodes
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
    let currentNode;
  
    while (currentNode = walker.nextNode()) {
      // Replace the text content using the MATCH_LIST
      currentNode.nodeValue = currentNode.nodeValue.replace(/\b(there|their|they're|There|Their|They're|THERE|THEIR|THEY'RE)\b/g, function(match) {
        return MATCH_LIST[match];
      });
    }
  }
  
  // Apply the transformation to the whole document body
  transformTextNodes(document.body);
  
  // Log statement to test that the extension loaded properly.
  console.log('Evil extension loaded!');
  