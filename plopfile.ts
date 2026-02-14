import type { NodePlopAPI } from 'plop';

export default function (plop: NodePlopAPI) {
  plop.setGenerator('component', {
    description: 'Creates a new component and export it',
    prompts: [
      {
        type: 'input',
        name: 'title',
        message: 'What will be the name of the component?',
      },
    ],
    actions: [
      {
        type: 'append',
        path: 'src/index.ts',
        template: `export { {{pascalCase title}}, type {{pascalCase title}}Props } from './components/{{dashCase title}}/{{dashCase title}}';\n`,
        separator: '',
      },
      {
        type: 'add',
        path: 'src/components/{{dashCase title}}/{{dashCase title}}.tsx',
        templateFile: 'templates/component/component.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{dashCase title}}/{{dashCase title}}.spec.tsx',
        templateFile: 'templates/component/spec.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{dashCase title}}/{{dashCase title}}.stories.tsx',
        templateFile: 'templates/component/stories.hbs',
      },
    ],
  });
}
