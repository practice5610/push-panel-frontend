import { Admin, Resource } from "react-admin";
import "bootstrap/dist/css/bootstrap.min.css";
import API_URL from "./url";

//importing components
import Dashboard from "./dashboard";
import ReportList from "./lists/reports";
import TemplateList from "./lists/templates";

//importing icons
import WebIcon from "@mui/icons-material/Web";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import RepeatOneOnIcon from "@mui/icons-material/RepeatOneOn";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ExtensionIcon from "@mui/icons-material/Extension";

//importing functions and objects
import custmDataProvider from "./dataProvider/index";
import MyAuthProvider from "./authProvider/index";
import siteList from "./lists/sites";
import SendNotification from "./sendNotification";
import Integrate from "./integrate";
import ChangePassword from "./changePassword";
import CreateTemplate from "./creates/createTemplate";
import CreateSite from "./creates/createSite";
import Schedule from "./lists/schedule";

let dp = new custmDataProvider(API_URL);
let myap = new MyAuthProvider(API_URL);

function App() {
  return (
    <Admin dataProvider={dp} authProvider={myap} dashboard={Dashboard}>
      <Resource
        name="Sites"
        list={siteList}
        icon={WebIcon}
        create={CreateSite}
      />
      <Resource name="Reports" list={ReportList} icon={AssessmentIcon} />
      <Resource
        name="Templates"
        list={TemplateList}
        create={CreateTemplate}
        icon={ExtensionIcon}
      />
      <Resource
        name="Send Notification"
        list={SendNotification}
        icon={NotificationsActiveIcon}
      />
      <Resource name="Schedule" list={Schedule} icon={MoreTimeIcon} />
      <Resource
        name="How To Integrate"
        list={Integrate}
        icon={RepeatOneOnIcon}
      />
      <Resource name="Accounts" list={ChangePassword} icon={AccountBoxIcon} />
    </Admin>
  );
}

export default App;
