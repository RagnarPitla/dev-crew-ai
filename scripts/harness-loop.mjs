#!/usr/bin/env node

const steps = [
  {
    name: 'Grill me',
    purpose: 'Pressure-test the request before planning.',
    files: ['.github/prompts/grill-me.prompt.md', '.claude/skills/grill-me/SKILL.md'],
  },
  {
    name: 'Grill docs',
    purpose: 'Check whether docs or specs are implementation-ready.',
    files: ['.github/prompts/grill-docs.prompt.md', '.claude/skills/grill-docs/SKILL.md'],
  },
  {
    name: 'Plan',
    purpose: 'Create a plan artifact in plans/.',
    files: ['.claude/skills/plan/SKILL.md'],
  },
  {
    name: 'Implement',
    purpose: 'Execute the plan in a focused lane.',
    files: ['.claude/skills/implement/SKILL.md'],
  },
  {
    name: 'Validate',
    purpose: 'Run deterministic checks.',
    files: ['.claude/skills/validate/SKILL.md', 'package.json'],
  },
  {
    name: 'Review',
    purpose: 'Use rubber-duck critique before shipping.',
    files: ['.github/prompts/rubber-duck.prompt.md', '.claude/agents/rubber-duck.md'],
  },
  {
    name: 'Improve harness',
    purpose: 'Convert repeated failures into rules, docs, checks, or workflows.',
    files: ['.github/prompts/harness-retro.prompt.md', 'AGENTS.md', 'docs/harness/'],
  },
];

const printOnly = process.argv.includes('--print') || process.argv.length === 2;

function printLoop() {
  console.log('Dev Crew AI harness loop');
  console.log('========================');
  for (const [index, step] of steps.entries()) {
    console.log(`\n${index + 1}. ${step.name}`);
    console.log(`   Purpose: ${step.purpose}`);
    console.log(`   Files: ${step.files.join(', ')}`);
  }
  console.log('\nMental model: do not just retry. Improve the harness.');
}

if (printOnly) {
  printLoop();
} else {
  console.error('Unknown option. Use: node scripts/harness-loop.mjs --print');
  process.exit(1);
}

