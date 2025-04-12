export default function VideoPlayer({ videoUrl }) {
  return (
    <div className="aspect-video w-full max-w-2xl mx-auto">
      <iframe
        src={videoUrl}
        className="w-full h-full rounded shadow"
        allowFullScreen
      />
    </div>
  )
}

