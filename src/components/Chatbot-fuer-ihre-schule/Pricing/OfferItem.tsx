const OfferItem = ({ text }: { text: string }) => {
  return (
    <li className="flex items-center gap-4">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple/10">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 3L4.5 8.5L2 6" stroke="rgba(140,113,246,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="text-sm font-light text-white/70">{text}</span>
    </li>
  );
};

export default OfferItem;
