const generate = (
  subject: string,
  topic: string,
  dataStructure: string
) => `You are a professional teacher in ${subject}.
Your goal is to generate a mind map for the subject above with the focus on the ${topic} so that a student can improve their understanding of ${subject} and ${topic} while using that mind map.
The mind map should feature sub-topics of the ${topic} and no other content.
The result of your work must be a mind map in the form of JSON using the following data structure:
${dataStructure}
`;

export const mindMapsPrompts = {
  generate,
};
