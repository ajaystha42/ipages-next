import { useRouter } from "next/router";
import { jwt, useLoggedIn } from "../services/login";
import { useEffect } from "react";
import { GetStaticPaths } from "next";
import Home from "../components/Home";
import { getIPageByRouteUrl } from "../services/iPage";
import ErrorComponent from "./error";
import IPage from "../components/Ipage";

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
  // console.log({ pageContext });
  if (!pageContext) return <ErrorComponent />;
  const pathname = router.query;

  if (loggedIn) {
    if (Object.keys(pathname).length === 0) {
      console.log("logged in and home page");
      return <Home />;
    } else {
      console.log("loggedin but other page");
      // here we can render other routing pages/components after LOGGEDIN as well
      if (pageContext) {
        const { id, routedURL, sourceURL, pageTitle, requiresLogin, isLive } =
          pageContext;
        console.log({ pageContext });
        // if (isLive && !requiresLogin) {
        return <IPage pageContext={pageContext} />;
        // }
        // const { id, routedURL, sourceURL, pageTitle, requiresLogin, isLive } =
        //   pageContext;

        // return (
        //   <iframe
        //     src={sourceURL}
        //     loading="eager"
        //     className="itest-iframe ipage-test"
        //     title={pageTitle}
        //     // onLoad={loadHandler}
        //   />
        // );
      }
    }
  } else {
    // Other pages
    // home page after loggedout

    console.log("logged out and other pages");
    if (pageContext) {
      return <IPage pageContext={pageContext} />;
      //   const { id, routedURL, sourceURL, pageTitle, requiresLogin, isLive } =
      //     pageContext;
      //   return (
      //     <iframe
      //       src={sourceURL}
      //       loading="eager"
      //       className="itest-iframe ipage-test"
      //       title={pageTitle}
      //       // onLoad={loadHandler}
      //     />
      //   );
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

  try {
    const data = await getIPageByRouteUrl(currentSlug);

    if (data.message) {
      throw new Error("Page data not found");
    }
    const { id, routeUrl, sourceURL, pageTitle, requiresLogin, isLive } =
      data.pageData;
    const pageContext = {
      id,
      routeUrl,
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
