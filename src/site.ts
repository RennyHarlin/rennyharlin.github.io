export const SITE = {
  title: 'Renny Harlin',
  author: 'Renny Harlin',
  description:
    "Renny Harlin's blog about Artificial Intelligence, Computer Science, and Robotics.",
  intro:
    'Welcome to my corner of the internet. I write about Artificial Intelligence, Computer Science, and Robotics. Occasionally I also philosophize about my life.',
  image: '/profile.jpg',
  googleAnalytics: 'G-Y8J11SHRX5',
  socials: [
    { name: 'GitHub', url: 'https://github.com/RennyHarlin' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/renny-harlin-16a823297' },
  ],
};

// Optional blurbs shown on a topic's page. Topics not listed here still work.
export const TOPIC_DESCRIPTIONS: Record<string, string> = {
  'Introduction to Machine Learning':
    'Machine learning is always understood as abstractions, this is my attempt to unravel those abstractions and understand the math behind these amazing algorithms.',
  'Math for Machine Learning':
    'Some prerequisites for my series on Introduction to Machine Learning.',
};
