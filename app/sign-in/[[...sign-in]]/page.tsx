import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="py-20 flex justify-center items-center">
      <SignIn
        appearance={{
          layout: {
            logoPlacement: 'outside',
          },
          elements: {
            formButtonPrimary:
              'bg-purple-500 hover:bg-slate-400 text-sm normal-case',
          },
        }}
      />
    </div>
  )
}
