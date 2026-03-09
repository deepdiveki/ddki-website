const SectionHeader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={className}>{children}</div>;

export const HeaderTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <h2 className={className}>{children}</h2>;

export const HeaderSubtitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <p className={className}>{children}</p>;

export { SectionHeader };
