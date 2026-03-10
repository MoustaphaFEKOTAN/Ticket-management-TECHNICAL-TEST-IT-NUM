export const useAuthService = () => {
  const config = useRuntimeConfig()
  const base = config.public.apiBase

  const login = async (email: string, password: string) => {
    const res = await fetch(`${base}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    if (!res.ok) throw new Error('Adresse e-mail ou mot de passe incorrects')
    return res.text()
  }

const register = async (username: string, email: string, password: string, confirmPassword: string) => {
  const res = await fetch(`${base}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password, confirmPassword })
  })
  if (!res.ok) throw new Error('Erreur inscription, veuillez vérifier les informations fournies(Mot de passe doit comporter au moins 8 caractères et correspondre à la confirmation)')
  return res.json()
}

  return { login, register }
}