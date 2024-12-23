import { parseCookies, CollectionConfig, AuthStrategy, AccessArgs, AuthStrategyFunctionArgs, AuthStrategyResult, User } from 'payload'

type isAuthenticated = (args: AccessArgs<User>) => boolean

const authenticated: isAuthenticated = ({ req: { user } }) => {
  console.log('isAuthenticated', user)
  return Boolean(user);
};

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  auth: {
    disableLocalStrategy: true,
    strategies: [
      {
        name: 'custom-strategy',
        authenticate: async ({ payload, headers }: AuthStrategyFunctionArgs): Promise<AuthStrategyResult> => {

          const cookie = parseCookies(headers),
            token = cookie.get('token');

          console.log('token', token);

          if (!token) return { user: null }

          let usersQuery = await payload.find({
            collection: 'users',
            where: {
              test: {
                equals: "testuser"
              }
            },
          });

          if (!usersQuery?.docs?.length) {

            await payload.create({
              collection: 'users',
              data: {
                test: "testuser",
                email: "test@user.com"
              }
            });

            usersQuery = await payload.find({
              collection: 'users',
              where: {
                test: {
                  equals: "testuser"
                }
              },
            });
          }

          console.log('usersQuery', usersQuery);

          if (!usersQuery?.docs?.length) return { user: null }

          return {
            user: {
              ...usersQuery.docs[0],
              email: usersQuery.docs[0].email || '',
              collection: 'users'
            }
          }
        }
      }
    ] as AuthStrategy[]
  },
  fields: [
    {
      name: 'test',
      label: 'Test',
      type: 'text'
    },
    {
      name: 'email',
      label: 'email',
      type: 'email'
    }
  ],
}
