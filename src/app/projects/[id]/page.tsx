import React from 'react'
import AdminProjectPage from '@/components/project/admin'
import UserProjectPage from './user'

const Project = ({ params }: { params: { id: string } }) => {
  const projectId = params.id
  const userRole: "admin" | "member" = 'admin'

  return (
    userRole === "admin" ? <AdminProjectPage/> : <UserProjectPage/>
  )
}

export default Project