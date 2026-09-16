import type { Access, FieldAccess } from 'payload'

export const anyone: Access = () => true

export const authenticated: Access = ({ req: { user } }) => Boolean(user)

export const isAdmin: Access = ({ req: { user } }) => {
  if (!user) return false
  return user.role === 'admin'
}

export const isAdminOrEditor: Access = ({ req: { user } }) => {
  if (!user) return false
  return user.role === 'admin' || user.role === 'editor'
}

export const adminFieldAccess: FieldAccess = ({ req: { user } }) => user?.role === 'admin'

export const publishedOrAuthenticated: Access = ({ req: { user } }) => {
  if (user) return true
  return {
    _status: {
      equals: 'published',
    },
  }
}
