import { RegisterForm } from './registerForm'

export default async function SomePage() {
  return (
    <main
      id="Container"
      className="min-h-screen overflow-hidden flex flex-col items-center"
    >
      <div id="Header" className="max-w-[572px] mt-16 ml-4 mr-4 self-center">
        <RegisterForm />
      </div>
    </main>
  )
}
