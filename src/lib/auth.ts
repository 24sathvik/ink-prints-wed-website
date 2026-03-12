// Simple localStorage-based auth (no Supabase / backend required).
// Users are stored in localStorage for client-side session management.

export interface UserSession {
  email: string;
  fullName: string;
  createdAt: string;
}

const SESSION_KEY = 'ink_prints_user';
const USERS_KEY   = 'ink_prints_users'; // persisted mock user store

/** Return the currently logged-in user, or null. */
export function getSession(): UserSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/** Register a new user. Returns an error string on failure, null on success. */
export function register(email: string, password: string, fullName: string): string | null {
  const users: Record<string, { password: string; fullName: string }> = JSON.parse(
    localStorage.getItem(USERS_KEY) || '{}'
  );

  if (users[email]) return 'An account with this email already exists.';

  users[email] = { password, fullName };
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  // Log in immediately after registration
  const session: UserSession = { email, fullName, createdAt: new Date().toISOString() };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return null;
}

/** Log in an existing user. Returns an error string on failure, null on success. */
export function login(email: string, password: string): string | null {
  const users: Record<string, { password: string; fullName: string }> = JSON.parse(
    localStorage.getItem(USERS_KEY) || '{}'
  );

  const user = users[email];
  if (!user) return 'No account found with this email.';
  if (user.password !== password) return 'Incorrect password.';

  const session: UserSession = { email, fullName: user.fullName, createdAt: new Date().toISOString() };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return null;
}

/** Log out the current user. */
export function logout(): void {
  localStorage.removeItem(SESSION_KEY);
}
