
class Gender {
  static MALE = "MALE";
  static FEMALE = "FEMALE";
}

export function preProcessData(data) {
  const initialNodes = [];
  const initialEdges = [];
  const deletedNodes = new Set();

  for (const person of Object.values(data.people)) {
    // Skip the preson if married and already node is created
    if (deletedNodes.has(person.id)) {
      continue;
    }

    // If not married
    if (!person.spouse) {
      person.data = {
        label: person.name,
      };
      initialNodes.push(person);
      continue;
    }

    // If married
    deletedNodes.add(person.spouse);
    const spouse = data.people[person.spouse];

    const personId =
      person.gender == Gender.MALE
        ? `${person.id}-${spouse.id}`
        : `${spouse.id}-${person.id}`;

    const marriedNode = {
      id: personId,
      type: "marriedNode",
      data: {
        MALE: person.gender === Gender.MALE ? person : spouse,
        FEMALE: person.gender === Gender.FEMALE ? person : spouse,
      },
    };
    initialNodes.push(marriedNode);

    // If person dose not have childeren skip the next section of code
    if (!person.children) {
      continue;
    }

    // If the person have childeren itterate through them
    for (const childIndex of person.children) {
      const child = data.people[childIndex];

      // If the child is not found skip the child
      if (!child) {
        continue;
      }

      const childId =
        child.gender == Gender.MALE
          ? `${child.id}-${child.spouse}`
          : `${child.spouse}-${child.id}`;
      
      // If the child is married point it to marriedNode of child
      if (child.spouse) {
        const edge = {
          id: `e-${personId}-${childId}`,
          source: personId,
          target: childId,
          animated: true,
          type: "smoothstep",
          sourceHandle: child.gende,
        };
        initialEdges.push(edge);
        continue;
      }

      const edge = {
        id: `e-${personId}-${child.id}`,
        source: personId,
        target: child.id,
        animated: true,
        type: "smoothstep",
      };
      initialEdges.push(edge);
    }
  }

  return { initialNodes, initialEdges };
}
