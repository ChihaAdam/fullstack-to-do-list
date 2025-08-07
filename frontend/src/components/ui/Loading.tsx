
function Loading() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
        <LoadingMinimal />
    </div>
  )
}
function LoadingMinimal(){
 return <div className="size-12 border-4 border-x-transparent mt-5 mx-auto border-t-purple-600 border-b-pink-500 animate-spin rounded-full"></div>
}
export {Loading,LoadingMinimal}
