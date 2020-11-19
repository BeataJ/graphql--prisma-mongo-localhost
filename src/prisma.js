import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466/',
});

// prisma.query.users(null, '{ id name posts { id title} }').then((data) => {
//   console.log(JSON.stringify(data, undefined, 2));
// });

// prisma.query.comments(null, '{ id text author { id name } }').then((data) => {
//   console.log(JSON.stringify(data, undefined, 2));
// });

prisma.mutation
  .createPost(
    {
      data: {
        title: 'Graphql 101',
        body: '',
        published: false,
        author: {
          connect: {
            id: '5fb20bc424aa9a00084100bb',
          },
        },
      },
    },
    '{ id title body published  }'
  )
  .then((data) => {
    console.log(data);
    return prisma.query.users(null, '{ id name, posts {id title }}');
  })
  .then((data) => {
    console.log(JSON.stringify(data, undefined, 2));
  });
