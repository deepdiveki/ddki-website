const Breadcrumb = ({ pageTitle }: { pageTitle: string }) => {
  return (
    <section className="relative z-10 pb-18 pt-30 lg:pt-35 xl:pt-40">
      <div className="px-4 text-center">
        <h1 className="mb-5.5 text-display-sm font-light -tracking-[1.2px] text-text-primary lg:text-display-lg">
          {pageTitle}
        </h1>
      </div>
    </section>
  );
};

export default Breadcrumb;
