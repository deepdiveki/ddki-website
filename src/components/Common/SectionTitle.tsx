type propsType = {
  subTitle?: string;
  title: string;
  paragraph?: string;
  center?: boolean;
  icon?: string;
  variant?: "default" | "software";
};

const SectionTitle = ({
  subTitle,
  title,
  paragraph,
  variant = "default",
}: propsType) => {
  const isSoftware = variant === "software";
  return (
    <div className="relative z-10 mb-16 text-center">
      {subTitle && (
        <span className={isSoftware
          ? "sw-glass relative mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-primary-light"
          : "sw-glass relative mb-4 inline-flex items-center gap-2 rounded-full border border-border-tertiary px-4.5 py-2 text-sm font-medium text-primary-darker shadow-sm"
        }>
          {isSoftware && <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1C12 1 12.7 5.3 14.7 7.3C16.7 9.3 21 10 21 10C21 10 16.7 10.7 14.7 12.7C12.7 14.7 12 19 12 19C12 19 11.3 14.7 9.3 12.7C7.3 10.7 3 10 3 10C3 10 7.3 9.3 9.3 7.3C11.3 5.3 12 1 12 1Z"/><path d="M19 15C19 15 19.4 17.1 20.1 17.9C20.9 18.6 23 19 23 19C23 19 20.9 19.4 20.1 20.1C19.4 20.9 19 23 19 23C19 23 18.6 20.9 17.9 20.1C17.1 19.4 15 19 15 19C15 19 17.1 18.6 17.9 17.9C18.6 17.1 19 15 19 15Z" opacity="0.7"/><circle cx="20" cy="5" r="1" opacity="0.5"/></svg>}
          {subTitle}
        </span>
      )}
      <h2 className={isSoftware
        ? "mb-4.5 text-display-sm font-bold -tracking-[0.96px] text-white lg:text-display-lg"
        : "mb-4.5 text-display-sm -tracking-[0.96px] text-text-primary lg:text-display-lg"
      }>
        {title}
      </h2>
      {paragraph ? (
        <p className={isSoftware
          ? "mx-auto max-w-[714px] text-md font-light text-white/70"
          : "mx-auto max-w-[714px] text-md font-light text-text-secondary"
        }>{paragraph}</p>
      ) : null}
    </div>
  );
};

export default SectionTitle;
