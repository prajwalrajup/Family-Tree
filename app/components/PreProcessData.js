class Gender {
  static MALE = "MALE";
  static FEMALE = "FEMALE";
}
export function preProcessData(data) {
  var deleteList = new Set();
  const initialEdges = [];

  var initialNodes = Object.values(data.people);

  for (let node of initialNodes) {
    if (deleteList.has(node.id)) {
      console.log("deleted", node.id);
      continue;
    }

    if (node.children) {
      node.children.forEach((child) => {
        initialEdges.push({
          id: `e-${node.id}-${child}`,
          source: node.id,
          target: child,
          animated: true,
          type: "smoothstep",
        });
      });
    }

    node["data"] = { label: node.name };

    if (node.spouse && node.spouse != null) {
      node["type"] = "marriedNode";
      var nodeData = node.data == undefined ? {} : node.data;

      nodeData[node.gender] = node;
      nodeData[data.people[node.spouse].gender] = data.people[node.spouse];

      node["data"] = nodeData;
      deleteList.add(node.spouse);
      initialNodes = initialNodes.filter((nodes) => nodes.id != node.spouse);
    }
  }

  return { initialNodes, initialEdges };
}
