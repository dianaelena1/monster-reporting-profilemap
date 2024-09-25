export interface blogcard {
  title: string;
  subtitle: string;
  subtext: string;
  image: string;
}

export const blogcards: blogcard[] = [
  {
    title: 'Our proccess',
    subtitle: '2 comments, 1 Like',
    subtext:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'assets/images/bg/bg1.jpg',
  },
  {
    title: 'Test automation',
    subtitle: '2 comments, 1 Like',
    subtext:
      'Cypress provides a powerful, easy-to-use API for writing and running tests.',
    image: 'assets/images/bg/bg2.jpg',
  },
  {
    title: 'What is testing?',
    subtitle: '2 comments, 1 Like',
    subtext:
      'Testing Pyramid is a framework that can facilitate developers to build quality software. ',
    image: 'assets/images/bg/bg3.jpg',
  },
  {
    title: 'About ProfileMap',
    subtitle: '2 comments, 1 Like',
    subtext:
      'Find out more about our application used by several companies around the world.',
    image: 'assets/images/bg/bg4.jpg',
  },
];
