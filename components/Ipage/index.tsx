const IPage = ({ pageContext }: any) => {
  const { id, routedURL, sourceURL, pageTitle, requiresLogin, isLive } =
    pageContext;

  return (
    <>
      <h1>This is IFrame Page</h1>

      <iframe
        src={sourceURL}
        loading="eager"
        className="itest-iframe ipage-test"
        title={pageTitle}
        // onLoad={loadHandler}
      />
    </>
  );
};

export default IPage;
