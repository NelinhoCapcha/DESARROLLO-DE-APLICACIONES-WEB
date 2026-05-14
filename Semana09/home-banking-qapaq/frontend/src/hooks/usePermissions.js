export const usePermissions = (permissions = []) => {
  const can = (permission) => permissions.includes(permission)

  return { can }
}
