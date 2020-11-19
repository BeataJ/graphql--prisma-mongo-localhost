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
        title: 'new graphql post live',
        body: 'You can find new course here',
        published: true,
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
  });
