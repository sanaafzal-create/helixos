import { getActivityLog } from '@/app/actions/search-activity'

export const metadata = {
  title: 'Activity - HelixOS',
}

export default async function ActivityPage() {
  const activities = await getActivityLog()

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create':
        return '#10B981'
      case 'update':
        return '#06B6D4'
      case 'delete':
        return '#EF4444'
      default:
        return '#F59E0B'
    }
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
          Activity Feed
        </h1>
        <p style={{ color: '#94A3B8' }}>
          Track all system activity and changes
        </p>
      </div>

      {activities.length > 0 ? (
        <div className="space-y-3">
          {activities.map((activity: any) => (
            <div
              key={activity.id}
              className="p-4 rounded-lg border flex items-center justify-between"
              style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div
                    className="px-3 py-1 rounded text-sm font-semibold"
                    style={{ backgroundColor: getActionColor(activity.action), color: '#0F172A' }}
                  >
                    {activity.action}
                  </div>
                  <h3 className="font-semibold" style={{ color: '#FFFFFF' }}>
                    {activity.entityType}
                  </h3>
                  <span style={{ color: '#94A3B8' }} className="text-sm">
                    #{activity.entityId.slice(0, 8)}
                  </span>
                </div>
              </div>
              <span style={{ color: '#94A3B8' }} className="text-sm">
                {new Date(activity.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="p-12 rounded-lg border text-center"
          style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}
        >
          <p style={{ color: '#94A3B8' }}>
            No activity yet. All your actions will appear here.
          </p>
        </div>
      )}
    </div>
  )
}
