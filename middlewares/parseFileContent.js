export const parseFileContent = (content) => {
  const lines = content.split(/\r?\n|\r/).filter((line) => line.trim() !== "");
  const verbsData = [];
  let currentVerb = null;

  for (let line of lines) {
    if (!line.startsWith("\t")) {
      const match = line.match(/^([\w+\s*\.*\(*\)*]+)\s+(.+)$/);

      if (match) {
        const verb = match[1].trim();
        const translate = match[2].trim();
        currentVerb = verb;

        const existingVerb = verbsData.find((item) => item.verb === verb);
        if (existingVerb) {
          existingVerb.translates.push(translate);
        } else {
          verbsData.push({
            verb,
            translates: [translate],
            examples: [],
          });
        }
      }
    } else {
      const example = line.replace(/^\t/, "").trim();
      if (currentVerb) {
        const existingVerb = verbsData.find((v) => v.verb === currentVerb);
        if (existingVerb) {
          existingVerb.examples.push(example[0].toUpperCase() + example.slice(1).replace(/(?<=.+)\.+$/, ""));
        }
      }
    }
  }

  return verbsData;
};
