// Admin access control
//
// Only emails listed here (or set via NEXT_PUBLIC_ADMIN_EMAILS, comma-separated)
// are allowed to add, edit, or delete products. All other signed-in users
// are treated as regular customers.
const DEFAULT_ADMIN_EMAILS = ['admin@revenio.com'];

export const ADMIN_EMAILS = (
  process.env.NEXT_PUBLIC_ADMIN_EMAILS
    ? process.env.NEXT_PUBLIC_ADMIN_EMAILS.split(',')
    : DEFAULT_ADMIN_EMAILS
)
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export function isAdminUser(user) {
  if (!user || !user.email) return false;
  return ADMIN_EMAILS.includes(user.email.toLowerCase());
}
