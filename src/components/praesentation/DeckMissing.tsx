export default function DeckMissing({ id }: { id: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center text-text-secondary">
      Deck „{id}“ ist nicht registriert.
    </div>
  );
}
