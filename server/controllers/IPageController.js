const express = require("express");
const IPages = [
  {
    id: 1,
    routedURL: "Partnerships/XYZProductions",
    sourceURL: "https://xznapp.com/iPageTest/",
    pageTitle: "IPage Test",
    requiresLogin: false,
    isLive: true,
  },
  {
    id: 2,
    routedURL: "",
    sourceURL: "https://xznapp.com/iPageTest/",
    pageTitle: "Other Page",
    requiresLogin: true,
    isLive: true,
  },
  {
    id: 3,

    routedURL: "a/b/c",
    sourceURL: "https://xznapp.com/iPageTest/",
    pageTitle: "Other Page",
    requiresLogin: false,
    isLive: false,
  },
  {
    id: 4,
    routedURL: "qqq/x/m/q",
    sourceURL: "https://xznapp.com/iPageTest/",
    pageTitle: "Another Page",
    requiresLogin: true,
    isLive: false,
  },
];

exports.getAllIPages = (req, res, next) => {
  res.status(200).json({ req: req.body, ipages: IPages });
};

exports.getIpageByRoutedUrl = (req, res, next) => {
  const routedUrl = req.query.routeUrl;
  console.log({ routedUrl });
  const IpageData = IPages.find((ipage) => ipage.routedURL == routedUrl);
  console.log({ IpageData });
  // check requiresLogin and isLive here
  // if isLive, we can send a flag and send the response to client accordingly
  if (IpageData) res.status(200).json({ routedUrl, ipageData: IpageData });
  else
    return res.status(401).json({
      message: "IPage Not Found",
    });
};
