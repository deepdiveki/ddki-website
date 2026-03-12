type propsType = {
  subTitle?: string;
  title: string;
  paragraph?: string;
  center?: boolean;
  icon?: string;
};

const SectionTitle = ({
  subTitle,
  title,
  paragraph,
}: propsType) => {
  return (
    <div className="relative z-10 mb-16 text-center">
      {subTitle && (
        <span className="sw-glass relative mb-4 inline-flex items-center gap-2 rounded-full border border-border-tertiary px-4.5 py-2 text-sm font-medium text-primary-darker shadow-sm">
          {subTitle}
        </span>
      )}
      <h2 className="mb-4.5 text-display-sm -tracking-[0.96px] text-text-primary lg:text-display-lg">
        {title}
      </h2>
      {paragraph ? (
        <p className="mx-auto max-w-[714px] text-md font-light text-text-secondary">{paragraph}</p>
      ) : null}
    </div>
  );
};

export default SectionTitle;
