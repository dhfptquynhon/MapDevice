import { wifiLocations as wifiTang1Beta } from "./Tang1Beta";
import { wifiLocations as wifiTang2Beta } from "./Tang2Beta";
import { wifiLocations as wifiTang3Beta } from "./Tang3Beta";
import { wifiLocations as wifiTang4Beta } from "./Tang4Beta";
import { wifiLocations as wifiTang5Beta } from "./Tang5Beta";
import { wifiLocations as wifiTang1Gamma } from "./Tang1Gamma";
import { wifiLocations as wifiTang2Gamma } from "./Tang2Gamma";
import { wifiLocations as wifiTang3Gamma } from "./Tang3Gamma";
import { wifiLocations as wifiTang4Gamma } from "./Tang4Gamma";
import { wifiLocations as wifiTang5Gamma } from "./Tang5Gamma";
import { wifiLocations as wifiTang1NCVso5 } from "./Tang1NCVso5";
import { wifiLocations as wifiTang2NCVso5 } from "./Tang2NCVso5";
import { wifiLocations as wifiTang1NCVso6 } from "./Tang1NCVso6";
import { wifiLocations as wifiTang2NCVso6 } from "./Tang2NCVso6";
import { wifiLocations as wifiTang1NCVso7 } from "./Tang1NCVso7";
import { wifiLocations as wifiTang2NCVso7 } from "./Tang2NCVso7";
import { wifiLocations as wifiKTXDomA } from "./KTXDomA";
import { wifiLocations as wifiKTXDomB } from "./KTXDomB";
import { wifiLocations as wifiSanVovinam } from "./SanVovinam";

export const allWifiLocations = [
  ...wifiTang1Beta.map((wifi) => ({ ...wifi, path: "/tang1beta" })),
  ...wifiTang2Beta.map((wifi) => ({ ...wifi, path: "/tang2beta" })),
  ...wifiTang3Beta.map((wifi) => ({ ...wifi, path: "/tang3beta" })),
  ...wifiTang4Beta.map((wifi) => ({ ...wifi, path: "/tang4beta" })),
  ...wifiTang5Beta.map((wifi) => ({ ...wifi, path: "/tang5beta" })),
  ...wifiTang1Gamma.map((wifi) => ({ ...wifi, path: "/tang1gamma" })),
  ...wifiTang2Gamma.map((wifi) => ({ ...wifi, path: "/tang2gamma" })),
  ...wifiTang3Gamma.map((wifi) => ({ ...wifi, path: "/tang3gamma" })),
  ...wifiTang4Gamma.map((wifi) => ({ ...wifi, path: "/tang4gamma" })),
  ...wifiTang5Gamma.map((wifi) => ({ ...wifi, path: "/tang5gamma" })),
  ...wifiTang1NCVso5.map((wifi) => ({ ...wifi, path: "/tang1ncvso5" })),
  ...wifiTang2NCVso5.map((wifi) => ({ ...wifi, path: "/tang2ncvso5" })),
  ...wifiTang1NCVso6.map((wifi) => ({ ...wifi, path: "/tang1ncvso6" })),
  ...wifiTang2NCVso6.map((wifi) => ({ ...wifi, path: "/tang2ncvso6" })),
  ...wifiTang1NCVso7.map((wifi) => ({ ...wifi, path: "/tang1ncvso7" })),
  ...wifiTang2NCVso7.map((wifi) => ({ ...wifi, path: "/tang2ncvso7" })),
  ...wifiKTXDomA.map((wifi) => ({ ...wifi, path: "/ktxdomA" })),
  ...wifiKTXDomB.map((wifi) => ({ ...wifi, path: "/ktxdomB" })),
  ...wifiSanVovinam.map((wifi) => ({ ...wifi, path: "/sanvovinam" })),
]; 