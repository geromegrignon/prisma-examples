import { prisma } from '../../../prisma/db'

export default defineEventHandler(async (event) => {
  const { searchString } = getQuery(event)

  const draftPosts = await prisma.post
    .findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchString,
            },
          },
          {
            content: {
              contains: searchString,
            },
          },
        ],
      },
    })
    .catch((error) => {
      console.error(error)
    })

  return draftPosts
})
