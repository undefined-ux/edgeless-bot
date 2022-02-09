import {ScraperRegister} from '../../src/class';

const regArray: Array<ScraperRegister> = [
  {
    name: "GitHub Release",
    entrance: "GitHub_Release",
    urlRegex: "https?://github.com/[^/]+/[^/]+",
    requiredKeys: [],
  },
  {
    name: "Portable Apps",
    entrance: "PortableApps",
    urlRegex: "https?://portableapps.com/apps/\\S+",
    requiredKeys: [],
  },
  {
    name: "Global Page Match",
    entrance: "Global_Page_Match",
    urlRegex: "universal://",
    requiredKeys: ["regex.scraper_version", "regex.download_link"],
    description: "Use given regex to match text in html file"
  },
  {
    name: "REST API",
    entrance: "REST_API",
    urlRegex: "universal://",
    requiredKeys: [
      "scraper_temp.api_url",
      "scraper_temp.version_path",
      "scraper_temp.download_path",
    ],
    description: "Specify Json REST api url by \"scraper_temp.api_url\", and specify object path by \"scraper_temp.version_path\" \"scraper_temp.download_path\""
  },
];

export default regArray;
