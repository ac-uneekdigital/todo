import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex flex-col h-screen items-center p-16">
      <h1 className='text-slate-900 font-bold text-4xl'>Todo&apos;s</h1>
      <div className='h-auto w-6/12 m-4 bg-slate-200 rounded-lg shadow-md p-8'>
        <form
          className='flex justify-center'>
          <input
            type="text"
            name="search"
            className="h-12 w-11/12 bg-white rounded-lg indent-3"
            placeholder="search for a todo"
          >
          </input>
        </form>

      </div>
    </main>
  )
}
