import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466/',
});

const createPostForUser = async (authorId, data) => {
  const userExist = await prisma.exists.User({
    id: authorId,
  });

  if (!userExist) {
    throw new Error('User not found');
  }

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
    '{ author { id name posts { id title published }}}'
  );

  return post;
};

const updatePostForUser = async (postId, data) => {
  const postExist = await prisma.exists.Post({
    id: postId,
  });

  if (!postExist) {
    throw new Error('Post not found');
  }

  const post = await prisma.mutation.updatePost(
    {
      where: {
        id: postId,
      },
      data,
    },
    '{ author { id name email posts { id title body published } } }'
  );

  return post.author;
};

// updatePostForUser('5fb5e0cea7b11b00070af8b2', {
//   title: 'new title of nothing',
//   body: 'new body of nothing',
//   published: false,
// })
//   .then((user) => {
//     console.log(JSON.stringify(user, undefined, 2));
//   })
//   .catch((error) => console.log(error.message));

// createPostForUser('5faf79f9ac546f0008c94798', {
//   title: 'All are right',
//   body: 'all are the best persons',
//   published: true,
// })
//   .then((user) => {
//     console.log(JSON.stringify(user, undefined, 2));
//   })
//   .catch((error) => {
//     console.log(error.message);
//   });

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
