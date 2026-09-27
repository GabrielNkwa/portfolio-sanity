export default {
  name: 'works',
  title: 'Works',
  type: 'document',
  // Existing fields stay ungrouped (visible under "All fields"); the tab filters to case-study fields.
  groups: [{name: 'caseStudy', title: 'Case study'}],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },

    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'projectLink',
      title: 'Project Link',
      type: 'string',
    },
    {
      name: 'codeLink',
      title: 'Code Link',
      type: 'string',
    },
    {
      name: 'imgUrl',
      title: 'ImageUrl',
      type: 'image',
      options: {
        hotspot: true,
      },
    },

    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        {
          name: 'tag',
          title: 'Tag',
          type: 'string',
        },
      ],
    },

    // Case study (shown on the site when problem, solution and result are filled in)
    {
      name: 'featured',
      title: 'Feature in case studies',
      type: 'boolean',
      group: 'caseStudy',
      initialValue: false,
    },
    {
      name: 'client',
      title: 'Client',
      type: 'string',
      group: 'caseStudy',
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
      group: 'caseStudy',
    },
    {
      name: 'role',
      title: 'My role',
      type: 'string',
      group: 'caseStudy',
      description: 'e.g. "Design and full-stack build"',
    },
    {
      name: 'problem',
      title: 'Problem',
      type: 'text',
      rows: 3,
      group: 'caseStudy',
      description: 'One or two sentences: what the client needed and why.',
    },
    {
      name: 'solution',
      title: 'What I built',
      type: 'text',
      rows: 3,
      group: 'caseStudy',
    },
    {
      name: 'resultValue',
      title: 'Result number',
      type: 'string',
      group: 'caseStudy',
      description: 'The headline figure, e.g. "38%", "12k", "6 weeks".',
    },
    {
      name: 'resultLabel',
      title: 'Result label',
      type: 'string',
      group: 'caseStudy',
      description: 'What the number measures, e.g. "fewer stock-outs in the first quarter".',
    },
  ],
}
