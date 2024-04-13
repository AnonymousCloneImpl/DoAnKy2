export default function Loading() {
  return (
    <div
      className="flex w-full items-center justify-center"
      style={{
        height: '600px'
      }}>
      <div className={"text-center flex flex-wrap justify-center h-full"}>
        <img src="/loading.webp" style={{ height: '70%', width: '100%' }} />
        <p className="text-5xl" style={{ height: '10%' }}>Loading...</p>
      </div>
    </div>
  )
}
