import React from 'react'
import AdminProjectPage from '@/components/project/admin/admin'
import UserProjectPage from '@/components/project/user/user'

const Project = ({ params }: { params: { id: string } }) => {
  const projectId = params.id
  const userRole : "member" | "admin" = "admin"
  return <>
  {/* @ts-ignore */}
  {userRole === "admin" ? <AdminProjectPage projectId={projectId} /> : userRole === "member" ? <UserProjectPage projectId={projectId} /> : null}
  </>
}

export default Project