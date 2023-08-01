import { useRouter } from "next/router";
import { jwt, useLoggedIn } from "../services/login";
import { useEffect } from "react";
import { GetStaticPaths } from "next";
import Home from "../components/Home";
import { getIPageByRouteUrl } from "../services/iPage";

export default function DynamicPage({ pageContext }: any) {
  const loggedIn = useLoggedIn();
  const router = useRouter();

  useEffect(() => {
    // checking login state
    const userInfo = localStorage.getItem("user");
    if (userInfo) {
      const userObj = JSON.parse(userInfo);
      jwt.next(userObj.token);
      // navigate(-1);
    }
  }, []);

  const { slug } = router.query;
  console.log({ pageContext });
  const pathname = router.query;

  if (loggedIn) {
    if (Object.keys(pathname).length === 0) {
      console.log("logged in and home page");
      return <Home />;
    } else {
      console.log("loggedin but other page");
      if (pageContext) {
        const { id, routedURL, sourceURL, pageTitle, requiresLogin, isLive } =
          pageContext;
        // here we can render other routing pages/components after LOGGEDIN as well
        return (
          <iframe
            src={sourceURL}
            loading="eager"
            // className="itest-iframe"
            title={pageTitle}
            // onLoad={loadHandler}
          />
        );
      }
    }
    // Home page
  } else {
    // Other pages
    console.log("logged out and other pages");
    if (pageContext) {
      const { id, routedURL, sourceURL, pageTitle, requiresLogin, isLive } =
        pageContext;
      // here we can render other routing pages/components after LOGGEDIN as well
      return (
        <iframe
          src={sourceURL}
          loading="eager"
          // className="itest-iframe"
          title={pageTitle}
          // onLoad={loadHandler}
        />
      );
    }
  }
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export const getStaticProps = async (context: {
  params: { slug: string[] };
  preview?: null | undefined;
}) => {
  const { params, preview = null } = context;

  const currentSlug = !params.slug ? "" : params.slug.join("/");
  console.log({ currentSlug });

  try {
    const pageData = await getIPageByRouteUrl(currentSlug);
    console.log({ pageData });

    if (pageData.message) {
      throw new Error("Page data not found");
    }
    const { id, routedURL, sourceURL, pageTitle, requiresLogin, isLive } =
      pageData.ipageData;
    const pageContext = {
      id,
      routedURL,
      sourceURL,
      pageTitle,
      requiresLogin,
      isLive,
    };
    return {
      props: {
        preview,
        pageContext,
      },
    };
  } catch (err) {
    return { props: { notFound: true } };
  }
};
