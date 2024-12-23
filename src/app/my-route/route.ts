import config from '@payload-config'
import { getPayload } from 'payload'
import { headers as getHeaders } from 'next/headers'

export const POST = async () => {

  const payload = await getPayload({
    config
  })

  const headers = await getHeaders()

  const { user } = await payload.auth({
    headers
  })

  console.log('check user', user)

  if (!user) return new Response('Action forbidden.', {
    status: 403

  })

  const data = await payload.find({
    collection: 'users',
  })

  return Response.json(data)
}
