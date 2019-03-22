import { addParameters, configure } from '@storybook/react';

addParameters({
  options: {
    name: 'useIntersection',
    sidebarAnimations: false,
  },
});

const req = require.context('../src/', true, /.*\.stories\.tsx$/);

configure(() => {
  req.keys().forEach((filename) => req(filename));
}, module);
