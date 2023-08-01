const express = require("express");
const IPages = [
  {
    id: 1,
    routeUrl: "Partnerships/XYZProductions",
    sourceURL: "https://xznapp.com/iPageTest/",
    pageTitle: "IPage Test",
    requiresLogin: false,
    isLive: true,
  },
  {
    id: 2,
    routeUrl: "",
    sourceURL: "https://mkt.husslup.com/iPageTest1/",
    pageTitle: "Other Page",
    requiresLogin: true,
    isLive: true,
    preview: "",
  },
  {
    id: 3,
    routeUrl: "a/b/c",
    sourceURL: "https://mkt.husslup.com/iPageTest1/",
    pageTitle: "Other Page",
    requiresLogin: true,
    isLive: false,
  },
  {
    id: 4,
    routeUrl: "qqq/x/m/q",
    sourceURL: "https://xznapp.com/iPageTest/",
    pageTitle: "Another Page",
    requiresLogin: true,
    isLive: false,
  },
];

exports.getAllIPages = (req, res, next) => {
  res.status(200).json({ req: req.body, ipages: IPages });
};

exports.getIPageByRouteUrl = (req, res, next) => {
  const routeUrl = req.query.routeUrl;
  const preview = req.query.preview;
  console.log({ routeUrl });
  // database query in the future
  const IpageData = IPages.find((ipage) => ipage.routeUrl == routeUrl);
  console.log({ IpageData });
  // check requiresLogin and isLive here
  // if isLive, we can send a flag and send the response to client accordingly
  if (IpageData) res.status(200).json({ routeUrl, pageData: IpageData });
  else
    return res.status(401).json({
      message: "IPage Not Found",
    });
};
