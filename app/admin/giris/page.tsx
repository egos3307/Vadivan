export default function AdminLoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f5f5f5] p-6">
      <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-lg">
        <h1 className="text-4xl font-bold">
          Admin Giriş
        </h1>

        <p className="text-zinc-500 mt-3">
          Yönetim paneline giriş yapın.
        </p>

        <form className="mt-8 flex flex-col gap-5">
          <input
            type="email"
            placeholder="E-posta"
            className="h-14 px-5 rounded-2xl border"
          />

          <input
            type="password"
            placeholder="Şifre"
            className="h-14 px-5 rounded-2xl border"
          />

          <button className="bg-black text-white h-14 rounded-2xl font-semibold">
            Giriş Yap
          </button>
        </form>
      </div>
    </main>
  )
}
