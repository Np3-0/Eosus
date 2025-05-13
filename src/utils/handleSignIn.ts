
export default function handleSignIn(event: React.FormEvent<HTMLFormElement>, buttonUsed: string, email?: string) {
  event.preventDefault();
  console.log(email);
}