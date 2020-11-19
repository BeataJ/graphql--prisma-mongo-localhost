import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466/',
});

const createPostForUser = async (authorId, data) => {
  const post = await prisma.mutation.createPost(
    {
      data: {
        ...data,
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    },
    '{ id }'
  );

  const user = await prisma.query.user(
    {
      where: {
        id: authorId,
      },
    },
    '{ id name email posts { id title  published} }'
  );

  return user;
};

const updatePostForUser = async (postId, data) => {
  const post = await prisma.mutation.updatePost(
    {
      where: {
        id: postId,
      },
      data,
    },
    '{ author { id } }'
  );
  const user = await prisma.query.user(
    {
      where: {
        id: post.author.id,
      },
    },
    '{ id name email posts { id title published } }'
  );
  return user;
};

updatePostForUser('5fb5dc92a7b11b00070af8b1', {
  published: false,
}).then((user) => {
  console.log(JSON.stringify(user, undefined, 2));
});

// createPostForUser('5faf79f9ac546f0008c94798', {
//   title: 'Greate books to read',
//   body: 'The war of art',
//   published: true,
// }).then((user) => {
//   console.log(JSON.stringify(user, undefined, 2));
// });

//------------------------------------------------------
// prisma.mutation
//   .createPost(
//     {
//       data: {
//         title: 'Graphql 101',
//         body: '',
//         published: false,
//         author: {
//           connect: {
//             id: '5fb20bc424aa9a00084100bb',
//           },
//         },
//       },
//     },
//     '{ id title body published  }'
//   )
//   .then((data) => {
//     console.log(data);
//     return prisma.query.users(null, '{ id name, posts {id title }}');
//   })
//   .then((data) => {
//     console.log(JSON.stringify(data, undefined, 2));
//   });

// prisma.mutation
//   .updatePost(
//     {
//       data: {
//         published: true,
//         body: 'new body for graphql 101',
//       },
//       where: {
//         id: '5fb5e1d3a7b11b00070af8b3',
//       },
//     },
//     '{ id title }'
//   )
//   .then((data) => {
//     console.log(data);
//     return prisma.query.posts(null, '{id  title body published}');
//   })
//   .then((data) => {
//     console.log(JSON.stringify(data, undefined, 2));
//   });
