import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466/',
});

prisma.query.users(null, '{ id name posts { id title} }').then((data) => {
  console.log(data);
});
