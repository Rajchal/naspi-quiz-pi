import VideoPlayer from '../components/VideoPlayer'

export default function Videos() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Videos</h1>
      <VideoPlayer videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ" />
    </div>
  )
}

