import { HomeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react'

const DashboardRoute = () => {
  return (
    <div className="routing-wrapper">
          <Link href={"/dashboard"} className="group routing-link">
            <span className="routing-label">dashboard</span>
            <HomeIcon className="routing-icon" />
          </Link>
        </div>
  )
}

export default DashboardRoute