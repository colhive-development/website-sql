import React from 'react'
import AdminProjectPage from '@/components/project/admin/admin'
import UserProjectPage from '@/components/project/user/user'

const Project = ({ params }: { params: { id: string } }) => {
  const projectId = params.id
  const userRole: "admin" | "member" = "admin"

  return <>
  {userRole === "admin" ? <AdminProjectPage projectId={projectId} /> : <UserProjectPage projectId={projectId} />}
  </>
}

export default Project